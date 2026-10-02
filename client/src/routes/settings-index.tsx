import type { Route } from "./+types/settings-index"
import { updateCurrentUser } from "../api/user"
import UserSettings from "../features/Settings/UserSettings"

export async function action({ request }: Route.ActionArgs) {
	try {
		const result = await updateCurrentUser(
			await request.formData(),
			request.headers.get("Cookie"),
		)
		return {
			success: true,
			message: result.message || "Profile updated successfully.",
		}
	} catch (error) {
		return {
			error:
				error instanceof Error
					? error.message
					: "Unable to update your profile.",
		}
	}
}

export default function SettingsIndex() {
	return <UserSettings />
}
