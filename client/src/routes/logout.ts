import { redirect } from "react-router"
import type { Route } from "./+types/logout"

import { logout } from "../features/authentication/lib/auth"

export async function loader() {
	return redirect("/")
}

export async function action({ request }: Route.ActionArgs) {
	let setCookie
	try {
		const result = await logout(request.headers.get("Cookie"))
		setCookie = result.setCookie
	} catch {
		// session is unusable either way — leave anyway
	}

	return redirect(
		"/",
		setCookie ? { headers: { "Set-Cookie": setCookie } } : undefined,
	)
}
