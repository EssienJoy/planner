import { Bot, Send } from "lucide-react"
import { Form, useActionData, useNavigation } from "react-router"

import { Footer, Header } from "../features/home/components"
import { sendChatMessage } from "../features/ai/lib/ai"

const GREETING = {
	role: "assistant",
	content:
		"Hi! I'm your Plannerly assistant. Tell me what's on your plate and I'll help you organize it.",
}

export async function action({ request }) {
	const formData = await request.formData()
	const text = formData.get("message")

	let history = []
	const rawHistory = formData.get("history")
	if (typeof rawHistory === "string" && rawHistory) {
		try {
			const parsed = JSON.parse(rawHistory)
			if (Array.isArray(parsed)) {
				history = parsed
					.filter(
						(message) =>
							message &&
							(message.role === "user" ||
								message.role === "assistant") &&
							typeof message.content === "string",
					)
					.map((message) => ({
						role: message.role,
						content: message.content.slice(0, 2000),
					}))
					.slice(-20)
			}
		} catch {
			history = []
		}
	}

	if (typeof text !== "string" || !text.trim()) {
		return { error: "Please enter a message.", messages: history }
	}

	const transcript = [...history, { role: "user", content: text.trim() }]

	try {
		const reply = await sendChatMessage(transcript)
		return {
			messages: [...transcript, { role: "assistant", content: reply }],
		}
	} catch (error) {
		return {
			error:
				error instanceof Error
					? error.message
					: "Something went wrong.",
			messages: transcript,
		}
	}
}

function AiPlanner() {
	const actionData = useActionData()
	const navigation = useNavigation()

	const transcript = actionData?.messages ?? [GREETING]
	const pending =
		navigation.state === "submitting"
			? navigation.formData?.get("message")
			: null
	const showPending = typeof pending === "string" && pending.trim() !== ""

	return (
		<>
			<Header />

			<main className="mx-auto w-full max-w-3xl px-4 py-10">
				<div className="mb-6 text-center">
					<h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
						AI Planner
					</h1>
					<p className="mx-auto mt-2 max-w-xl text-sm text-foreground-muted sm:text-base">
						Brainstorm ideas, break goals into tasks, and plan
						your day — no account needed.
					</p>
				</div>

				<section className="flex h-[calc(100dvh-22rem)] min-h-[480px] flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
					<div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
						{transcript.map((message, index) =>
							message.role === "user" ? (
								<div key={index} className="flex justify-end">
									<p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-white">
										{message.content}
									</p>
								</div>
							) : (
								<div
									key={index}
									className="flex items-start gap-2">
									<span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-primary">
										<Bot className="size-4" />
									</span>
									<p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm border border-border bg-surface px-4 py-2.5 text-sm text-foreground">
										{message.content}
									</p>
								</div>
							),
						)}

						{showPending && (
							<>
								<div className="flex justify-end">
									<p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-white">
										{pending}
									</p>
								</div>
								<div className="flex items-center gap-1.5 px-1 py-1">
									{[0, 1, 2].map((dot) => (
										<span
											key={dot}
											style={{
												animationDelay: `${dot * 150}ms`,
											}}
											className="size-2 animate-bounce rounded-full bg-foreground-muted"
										/>
									))}
								</div>
							</>
						)}

						{actionData?.error && (
							<p
								role="alert"
								className="rounded-xl border border-error/30 bg-error-muted px-4 py-2 text-sm font-semibold text-error-foreground">
								{actionData.error}
							</p>
						)}

						<div
							ref={(node) => {
								node?.scrollIntoView({
									behavior: "smooth",
									block: "end",
								})
							}}
						/>
					</div>

					<Form
						method="post"
						key={transcript.length}
						className="flex items-center gap-2 border-t border-border p-3">
						<input
							type="hidden"
							name="history"
							value={JSON.stringify(transcript.slice(-20))}
						/>
						<input
							name="message"
							autoFocus
							placeholder="Ask about your plans..."
							aria-label="Chat message"
							className="h-10 min-w-0 flex-1 rounded-xl border border-input-border bg-input px-3 text-sm text-foreground placeholder:text-input-placeholder focus:border-input-focus focus:outline-none"
						/>
						<button
							type="submit"
							aria-label="Send message"
							className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-all hover:bg-primary/90">
							<Send className="size-4" />
						</button>
					</Form>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default AiPlanner
