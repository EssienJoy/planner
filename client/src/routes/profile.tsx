import type { Route } from "./+types/profile"
import { getCurrentUser } from "../api/user"
import ProfileCard from "../features/profile/components/ProfileCard"

export async function loader({ request }: Route.LoaderArgs) {
	const response = await getCurrentUser(request.headers.get("Cookie"))
	return { user: response.data?.data }
}

export function HydrateFallback() {
	return <ProfileCard isLoading />
}

function Profile({ loaderData }: Route.ComponentProps) {
	return <ProfileCard user={loaderData.user} isLoading={false} />
}

export default Profile
