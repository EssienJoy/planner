import { useState } from "react"
import { Form, useNavigation, useSubmit } from "react-router"
import {
	CalendarDays,
	Check,
	CheckCircle2,
	Circle,
	ClipboardList,
	Pencil,
	Trash2,
	X,
} from "lucide-react"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	Button,
} from "@/components"

function TasksList({ tasks = [], actionData = null }) {
	const submit = useSubmit()
	const navigation = useNavigation()
	const [taskToDelete, setTaskToDelete] = useState(null)
	const [editingTaskId, setEditingTaskId] = useState(null)
	const isPending = navigation.state === "submitting"
	const isDeleting =
		isPending && navigation.formData?.get("_action") === "delete"

	function handleDelete() {
		if (!taskToDelete) return
		const formData = new FormData()
		formData.set("_action", "delete")
		formData.set("taskId", taskToDelete)
		submit(formData, { method: "post" })
		setTaskToDelete(null)
	}

	return (
		<section className="space-y-3">
			<AlertDialog
				open={Boolean(taskToDelete)}
				onOpenChange={(open) => {
					if (!open) setTaskToDelete(null)
				}}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete this task?</AlertDialogTitle>
						<AlertDialogDescription>
							This will permanently delete this task. This action
							cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<Button
							type="button"
							variant="outline"
							disabled={isDeleting}
							onClick={() => setTaskToDelete(null)}>
							No, keep task
						</Button>
						<Button
							type="button"
							variant="destructive"
							disabled={isDeleting}
							onClick={handleDelete}>
							{isDeleting ? "Deleting..." : "Yes, delete task"}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<header className="flex items-end justify-between gap-4">
				<div>
					<h2 className="text-lg font-extrabold text-foreground">
						Tasks
					</h2>
					<p className="mt-1 text-sm text-foreground-muted">
						{tasks.length} {tasks.length === 1 ? "task" : "tasks"} ·{" "}
						{tasks.filter((task) => task.completed).length}{" "}
						completed
					</p>
				</div>
			</header>

			{tasks.length === 0 ? (
				<div className="grid place-items-center rounded-xl border border-dashed border-border px-6 py-12 text-center">
					<span className="grid size-11 place-items-center rounded-lg bg-primary-subtle text-primary">
						<ClipboardList className="size-5" />
					</span>
					<p className="mt-4 font-semibold text-foreground">
						No tasks yet
					</p>
					<p className="mt-1 text-sm text-foreground-muted">
						Add a task above to start moving this plan forward.
					</p>
				</div>
			) : (
				<ul className="divide-y divide-border rounded-xl border border-border bg-surface px-4">
					{tasks.map((task) => {
						const isEditing = editingTaskId === task._id
						const actionError =
							actionData?._action === "edit" &&
							actionData?.taskId === task._id

						return (
							<li key={task._id} className="py-4">
								<div className="flex items-start gap-3">
									<Form method="post" className="pt-0.5">
										<input
											type="hidden"
											name="_action"
											value="toggle"
										/>
										<input
											type="hidden"
											name="taskId"
											value={task._id}
										/>
										<input
											type="hidden"
											name="completed"
											value={String(!task.completed)}
										/>
										<button
											type="submit"
											disabled={isPending}
											aria-label={
												task.completed
													? "Mark task incomplete"
													: "Mark task complete"
											}
											className={`grid size-6 place-items-center rounded-full transition-colors ${task.completed ? "text-success" : "text-foreground-muted hover:text-primary"}`}>
											{task.completed ? (
												<CheckCircle2 className="size-5" />
											) : (
												<Circle className="size-5" />
											)}
										</button>
									</Form>

									<div className="min-w-0 flex-1">
										{isEditing ? (
											<Form
												method="post"
												onSubmit={() =>
													setEditingTaskId(null)
												}
												className="flex flex-col gap-2 sm:flex-row">
												<input
													type="hidden"
													name="_action"
													value="edit"
												/>
												<input
													type="hidden"
													name="taskId"
													value={task._id}
												/>
												<input
													name="task"
													defaultValue={task.task}
													required
													maxLength={100}
													aria-label="Task description"
													className="h-9 min-w-0 flex-1 rounded-md border border-input-border bg-input px-3 text-sm text-foreground focus:border-input-focus focus:outline-none"
												/>
												<Button
													type="submit"
													size="sm"
													disabled={isPending}>
													<Check className="size-4" />{" "}
													Save
												</Button>
											</Form>
										) : (
											<>
												<p
													className={`wrap-break-word font-semibold ${task.completed ? "text-foreground-muted line-through" : "text-foreground"}`}>
													{task.task}
												</p>
												{task.dueDate && (
													<p className="mt-1 flex items-center gap-1.5 text-xs text-foreground-muted">
														<CalendarDays className="size-3.5" />
														Due{" "}
														{new Date(
															task.dueDate,
														).toLocaleDateString()}
													</p>
												)}
											</>
										)}
										{actionError && actionData.error && (
											<p
												role="alert"
												className="mt-2 text-sm font-semibold text-error-foreground">
												{actionData.error}
											</p>
										)}
									</div>

									<div className="flex shrink-0 items-center gap-1">
										<Button
											type="button"
											variant="ghost"
											size="icon"
											aria-label={
												isEditing
													? "Cancel editing"
													: "Edit task"
											}
											disabled={isPending}
											onClick={() =>
												setEditingTaskId(
													isEditing ? null : task._id,
												)
											}>
											{isEditing ? (
												<X className="size-4" />
											) : (
												<Pencil className="size-4" />
											)}
										</Button>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											aria-label="Delete task"
											disabled={isPending}
											onClick={() =>
												setTaskToDelete(task._id)
											}>
											<Trash2 className="size-4 text-error" />
										</Button>
									</div>
								</div>
							</li>
						)
					})}
				</ul>
			)}
		</section>
	)
}

export default TasksList
