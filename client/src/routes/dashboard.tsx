import type { Route } from "./+types/dashboard"

import { BACKEND_URL } from "@/lib/utils"
import Dashboard from "@/features/dashboard/components/Dashboard"

export async function loader({ request }: Route.LoaderArgs) {
	const cookie = request.headers.get("Cookie")
	const response = await fetch(`${BACKEND_URL}stats/tasks/overview`, {
		headers: cookie ? { Cookie: cookie } : {},
	})

	const result = await response.json()
	if (result.status !== "success") {
		throw new Error(result.message || "Could not load dashboard.")
	}

	return { overview: result.data }
}

function DashboardPage() {
	return <Dashboard />
}

export default DashboardPage
