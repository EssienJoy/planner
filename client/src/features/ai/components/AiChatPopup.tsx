import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { Link } from "react-router"

import ChatPanel from "./ChatPanel"

function AiChatPopup() {
	const [open, setOpen] = useState(false)

	return (
		<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
			{open && (
				<div className="flex h-[520px] max-h-[70vh] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl">
					<section className="flex items-center gap-2.5 border-b border-border px-4 py-3">
						<span className="flex size-8 items-center justify-center rounded-full bg-primary-subtle text-primary">
							<MessageCircle className="size-4" />
						</span>
						<div className="min-w-0 flex-1">
							<p className="text-sm font-bold text-foreground">
								AI Planner
							</p>
							<Link
								to="/ai-planner"
								className="text-xs font-semibold text-primary hover:underline">
								Open full page
							</Link>
						</div>
						<button
							type="button"
							aria-label="Close chat"
							onClick={() => setOpen(false)}
							className="flex size-9 items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground">
							<X className="size-5" />
						</button>
					</section>

					<ChatPanel />
				</div>
			)}

			<button
				type="button"
				aria-label={open ? "Close AI chat" : "Open AI chat"}
				onClick={() => setOpen((value) => !value)}
				className="flex size-14 items-center justify-center 
				rounded-full bg-primary text-white shadow-xl 
				transition-transform hover:scale-105">
				{open ? (
					<X className="size-6" />
				) : (
					<MessageCircle className="size-6" />
				)}
			</button>
		</div>
	)
}

export default AiChatPopup
