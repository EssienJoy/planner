declare interface ChatMessage {
	role: ChatRole
	content: string
}

declare type ChatRole = "user" | "assistant"
