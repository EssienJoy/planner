import { Bot, Send } from "lucide-react"
import { useFetcher } from "react-router"

function ChatPanel() {
	const GREETING: ChatMessage = {
		role: "assistant",
		content: `Hi! I'm your Plannerly assistant.Tell me what's on your plate and I'll help you organize it.`,
	}
	const fetcher = useFetcher()

	const transcript = (fetcher.data?.messages ?? [GREETING]) as ChatMessage[]
	const error =
		typeof fetcher.data?.error === "string" ? fetcher.data.error : null
	const pending =
		fetcher.state === "submitting" ? fetcher.formData?.get("message") : null
	const showPending = typeof pending === "string" && pending.trim() !== ""

	return (
		<section className="flex h-full min-h-0 flex-1 flex-col">
			<div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
				{transcript.map((message, index) =>
					message.role === "user" ? (
						<div key={index} className="flex justify-end">
							<p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-white">
								{message.content}
							</p>
						</div>
					) : (
						<div key={index} className="flex items-start gap-2">
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
					<div className="flex items-center gap-1.5 px-1 py-1">
						{[0, 1, 2].map((dot) => (
							<span
								key={dot}
								style={{ animationDelay: `${dot * 150}ms` }}
								className="size-2 animate-bounce rounded-full bg-foreground-muted"
							/>
						))}
					</div>
				)}

				{error && (
					<p
						role="alert"
						className="rounded-xl border border-error/30 bg-error-muted px-4 py-2 text-sm font-semibold text-error-foreground">
						{error}
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

			<fetcher.Form
				method="post"
				action="/ai-planner"
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
			</fetcher.Form>
		</section>
	)
}

export default ChatPanel
