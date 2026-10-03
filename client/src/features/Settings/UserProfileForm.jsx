import { Form, useActionData, useNavigation } from "react-router"
import { MdOutlineFileUpload } from "react-icons/md"
import { Button } from "@/components"

function UserProfileForm({ user }) {
	const actionData = useActionData()
	const navigation = useNavigation()
	const isPending = navigation.state === "submitting"

	return (
		<Form
			method="post"
			encType="multipart/form-data"
			className="flex flex-col gap-5 rounded-3xl
		text-sm ">
			<div className="grid gap-2">
				<label htmlFor="fullName" className="font-bold">
					Full Name
				</label>
				<input
					name="fullName"
					disabled
					className="block w-full rounded-xl border border-input-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-input-placeholder focus:border-input-focus focus:outline-none"
					type="text"
					defaultValue={user?.fullName}
				/>
			</div>

			<div className="grid gap-2">
				<label htmlFor="email" className="font-bold">
					Email
				</label>
				<input
					disabled
					name="email"
					className="block w-full rounded-xl border border-input-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-input-placeholder focus:border-input-focus focus:outline-none"
					type="text"
					defaultValue={user?.email}
				/>
			</div>

			{/* Profile Image Section */}
			<div className="flex items-center gap-6 mb-8">
				<div className="w-12 h-12 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-border bg-primary-subtle">
					<img
						src={user?.photo || `/img/png/default.jpg`}
						alt="User profile"
						className="w-full h-full object-cover"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label className="font-bold text-sm">
						Change Profile Photo
					</label>

					<input
						className="hidden"
						type="file"
						accept="image/*"
						id="photo"
						name="photo"
					/>

					<label
						htmlFor="photo"
						className="px-4  py-2 rounded-xl 
						 text-sm
						 flex items-center gap-2 cursor-pointer">
						<span className="bg-secondary text-primary">
							Choose file
						</span>{" "}
						<MdOutlineFileUpload />
					</label>
				</div>
			</div>

			<Button type="submit" disabled={isPending}>
				{isPending ? "updating..." : "Update User"}
			</Button>
			{actionData?.error && (
				<p
					role="alert"
					className="text-sm font-semibold text-error-foreground">
					{actionData.error}
				</p>
			)}
			{actionData?.success && (
				<p role="status" className="text-sm font-semibold text-success">
					{actionData.message}
				</p>
			)}
		</Form>
	)
}

export default UserProfileForm
