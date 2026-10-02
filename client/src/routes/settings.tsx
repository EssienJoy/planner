import type { Route } from "./+types/settings"
import { getCurrentUser } from "../api/user"
import SettingsLayout from "../features/Settings/SettingsLayout"

export async function loader({ request }: Route.LoaderArgs) {
	const response = await getCurrentUser(request.headers.get("Cookie"))
	return { user: response.data?.data }
}

function Settings({ loaderData }: Route.ComponentProps) {
	return <SettingsLayout user={loaderData.user} />
}

export default Settings
