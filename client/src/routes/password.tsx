import type { Route } from "./+types/password"
import { data } from "react-router"
import { updateCurrentUserPassword } from "../features/authentication/lib/auth"
import UserPasswordForm from "../features/Settings/UserPasswordForm"

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData()
	const passwordData = {
		currentPassword: String(formData.get("currentPassword") || ""),
		password: String(formData.get("password") || ""),
		confirmPassword: String(formData.get("confirmPassword") || ""),
	}

	try {
		const result = await updateCurrentUserPassword(
			passwordData,
			request.headers.get("Cookie"),
		)
		const headers = new Headers()
		if (result.setCookie) headers.set("Set-Cookie", result.setCookie)

		return data(
			{ success: true, message: "Password updated successfully." },
			{ headers },
		)
	} catch (error) {
		return {
			error:
				error instanceof Error
					? error.message
					: "Unable to update your password.",
		}
	}
}

function Password() {
	return (
		<div className="max-w-xl">
			<h2 className="text-xl font-extrabold tracking-tight text-foreground">
				Update password
			</h2>
			<p className="mt-1 text-sm text-foreground-muted">
				Choose a strong password you don&apos;t use elsewhere.
			</p>
			<div className="mt-6">
				<UserPasswordForm />
			</div>
		</div>
	)
}

export default Password
