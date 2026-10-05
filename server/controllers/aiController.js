const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const SYSTEM_PROMPT = `You are Plannerly's AI planning 
assistant inside a personal planner app.
Help the user plan their day, break goals into tasks,
 prioritize work, build routines, and stay focused.
Be concise, practical, and encouraging. Answer in plain 
text with short paragraphs or simple lists.
If asked about anything unrelated to planning, 
productivity, or organization, briefly say that's
 outside your lane and steer back to planning.`;

exports.chat = catchAsync(async (req, res, next) => {
    const { messages } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
        return next(new AppError('Please provide chat messages', 400));
    }

    const clean = messages
        .filter(
            (message) =>
                message &&
                (message.role === 'user' || message.role === 'assistant') &&
                typeof message.content === 'string'
        )
        .map((message) => ({
            role: message.role,
            content: message.content.slice(0, 2000),
        }))
        .slice(-20);

    if (clean.length === 0) {
        return next(new AppError('Please provide chat messages', 400));
    }

    if (!process.env.GROQ_API_KEY) {
        return next(new AppError('AI chat is not configured', 500));
    }

    let completion = null;
    try {
        const response = await fetch(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'openai/gpt-oss-120b',
                    temperature: 0.7,
                    max_tokens: 1024,
                    messages: [
                        { role: 'system', content: SYSTEM_PROMPT },
                        ...clean,
                    ],
                }),
                signal: AbortSignal.timeout(30000),
            }
        );

        let rawBody = '';
        try {
            rawBody = await response.text();
        } catch {
            rawBody = '';
        }

        try {
            completion = rawBody ? JSON.parse(rawBody) : null;
        } catch {
            completion = null;
        }

        const upstreamMessage =
            completion && completion.error && completion.error.message
                ? String(completion.error.message).slice(0, 200)
                : '';

        if (response.status === 401) {
            console.error('Groq rejected the API key:', upstreamMessage);
            return next(new AppError('AI provider rejected the API key', 502));
        }
        if (response.status === 429) {
            return next(
                new AppError(
                    'The assistant is busy right now. Please try again shortly.',
                    429
                )
            );
        }
        if (!response.ok || !completion) {
            if (upstreamMessage) {
                console.error(`Groq error (${response.status}):`, upstreamMessage);
            }
            return next(
                new AppError(
                    upstreamMessage
                        ? `The assistant failed to reply (${upstreamMessage})`
                        : 'The assistant failed to reply',
                    502
                )
            );
        }
    } catch (error) {
        if (error && error.name === 'TimeoutError') {
            return next(
                new AppError('The assistant took too long to reply', 504)
            );
        }
        throw error;
    }

    const reply = completion.choices?.[0]?.message?.content?.trim();
    if (!reply) {
        return next(new AppError('The assistant returned an empty reply', 502));
    }

    res.status(200).json({
        status: 'success',
        data: { reply },
    });
});
