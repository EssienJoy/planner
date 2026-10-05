import { BACKEND_URL } from "@/lib/utils";

export async function sendChatMessage(messages) {
	const response = await fetch(`${BACKEND_URL}ai/chat`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({ messages }),
	});

	let data = null;
	try {
		data = await response.json();
	} catch {
		data = null;
	}

	if (!response.ok || !data || data.status !== "success") {
		throw new Error(
			(data && data.message) || "Chat failed. Please try again."
		);
	}

	const reply = data?.data?.reply;
	if (typeof reply !== "string" || !reply.trim()) {
		throw new Error("The assistant returned an empty reply.");
	}

	return reply;
}
