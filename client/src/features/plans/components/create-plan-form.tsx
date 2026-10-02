import type { FormEvent } from "react"
import { HiCheck } from "react-icons/hi2"
import { useActionData, useNavigation, useSubmit } from "react-router"

import { Button } from "../../../components"

function CreatePlanForm() {
	const submit = useSubmit()
	const navigation = useNavigation()
	const actionData = useActionData()
	const isSubmitting =
		navigation.state === "submitting" &&
		navigation.formData?.get("_action") === "create"

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const form = event.currentTarget
		const formData = new FormData(form)
		formData.set("_action", "create")
		submit(formData, { method: "post" })
		form.reset()
	}

	return (
		<form
			id="create-plan"
			onSubmit={handleSubmit}
			className="flex scroll-mt-24 flex-col gap-4 rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-6">
			<label
				htmlFor="plans"
				className="text-base font-bold text-foreground sm:text-lg">
				Create a plan
			</label>

			<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
				<textarea
					className="h-20 grow rounded-2xl border border-input-border bg-input p-4 text-sm text-foreground placeholder:text-input-placeholder focus:border-input-focus focus:outline-none sm:text-base"
					name="plan"
					id="plans"
					placeholder="Write your plan here..."
					required
				/>

				<Button
					type="submit"
					disabled={isSubmitting}
					className="flex items-center gap-2 self-start text-sm sm:self-center">
					<HiCheck />
					{isSubmitting ? "Creating..." : "Add"}
				</Button>
			</div>

			{actionData?._action === "create" && actionData?.error && (
				<p
					role="alert"
					className="rounded-xl border border-error/30 bg-error-muted px-4 py-2 text-sm font-semibold text-error-foreground">
					{actionData.error}
				</p>
			)}
			{actionData?._action === "create" && actionData?.success && (
				<p role="status" className="text-sm font-semibold text-success">
					{actionData.message}
				</p>
			)}
		</form>
	)
}

export default CreatePlanForm
