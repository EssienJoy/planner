import { Link, useOutletContext } from "react-router"
import UserProfileForm from "./UserProfileForm"

function UserSettings() {
	const user = useOutletContext()
	return (
		<div className="flex-1 sm:pr-8">
			<h1 className="text-lg  sm:text-2xl font-bold mb-5">
				Your Account Settings
			</h1>
			<UserProfileForm user={user} />

			<div className="mt-6 sm:mt-12  rounded-3xl">
				<h2 className="text-lg sm:text-xl font-bold mb-5">
					Change Password
				</h2>
				<Link
					to="/settings/password"
					className="font-semibold text-primary underline underline-offset-4 hover:text-foreground">
					Update password
				</Link>
			</div>
		</div>
	)
}

export default UserSettings
