import { Plus } from "lucide-react"
import { useNavigation, useSubmit } from "react-router"

import { Button } from "@/components"

function AddTask({ actionData = null }) {
	const submit = useSubmit()
	const navigation = useNavigation()
	const isCreating =
		navigation.state === "submitting" &&
		navigation.formData?.get("_action") === "create"

	function handleSubmit(event) {
		event.preventDefault()
		const form = event.currentTarget
		const formData = new FormData(form)
		formData.set("_action", "create")
		submit(formData, { method: "post" })
		form.reset()
	}

	return (
		<form
			id="add-task-form"
			method="post"
			onSubmit={handleSubmit}
			className="rounded-xl border border-border bg-surface p-4 sm:p-5">
			<input type="hidden" name="_action" value="create" />
			<div className="mb-4">
				<h2 className="font-bold text-foreground">Add a task</h2>
				<p className="mt-1 text-sm text-foreground-muted">
					Add the next concrete step for this plan.
				</p>
			</div>
			<div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px_auto] sm:items-end">
				<div className="grid gap-1.5">
					<label
						htmlFor="new-task"
						className="text-sm font-semibold text-foreground">
						Task
					</label>
					<input
						id="new-task"
						name="task"
						required
						maxLength={100}
						placeholder="What needs to get done?"
						className="h-10 w-full rounded-md border border-input-border bg-input px-3 text-sm text-foreground placeholder:text-input-placeholder focus:border-input-focus focus:outline-none"
					/>
				</div>
				<div className="grid gap-1.5">
					<label
						htmlFor="task-due-date"
						className="text-sm font-semibold text-foreground">
						Due date
					</label>
					<input
						id="task-due-date"
						name="dueDate"
						type="date"
						className="h-10 w-full rounded-md border border-input-border bg-input px-3 text-sm text-foreground focus:border-input-focus focus:outline-none"
					/>
				</div>
				<Button type="submit" disabled={isCreating}>
					<Plus className="size-4" />
					{isCreating ? "Adding..." : "Add task"}
				</Button>
			</div>
			{actionData?._action === "create" && actionData?.error && (
				<p
					role="alert"
					className="mt-3 text-sm font-semibold text-error-foreground">
					{actionData.error}
				</p>
			)}
		</form>
	)
}

export default AddTask
