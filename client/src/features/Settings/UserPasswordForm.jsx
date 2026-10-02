import { useEffect, useRef } from "react"
import { Form, useActionData, useNavigation } from "react-router"
import Button from "../../components/ui/AppButton"

function UserPasswordForm() {
	const formRef = useRef(null)
	const actionData = useActionData()
	const navigation = useNavigation()
	const isPending = navigation.state === "submitting"

	useEffect(() => {
		if (actionData?.success) formRef.current?.reset()
	}, [actionData])

	return (
		<Form
			ref={formRef}
			method="post"
			className="flex flex-col gap-5 max-w-md text-sm">
			<div className="grid gap-2">
				<label className="font-bold text-sm">Current Password</label>
				<input
					type="password"
					name="currentPassword"
					required
					className="block w-full rounded-xl border border-input-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-input-placeholder focus:border-input-focus focus:outline-none"
					placeholder="********"
				/>
			</div>

			<div className="grid gap-2">
				<label className="font-bold text-sm">New Password</label>
				<input
					type="password"
					name="password"
					required
					className="block w-full rounded-xl border border-input-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-input-placeholder focus:border-input-focus focus:outline-none"
					placeholder="********"
				/>
			</div>

			<div className="grid gap-2">
				<label className="font-bold text-sm">
					Confirm New Password
				</label>
				<input
					type="password"
					name="confirmPassword"
					required
					className="block w-full rounded-xl border border-input-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-input-placeholder focus:border-input-focus focus:outline-none"
					placeholder="********"
				/>
			</div>

			<Button
				type="submit"
				className="self-start font-bold"
				bg="bg-primary"
				text="text-secondary"
				disabled={isPending}>
				{isPending ? "Updating..." : "Update Password"}
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

export default UserPasswordForm
