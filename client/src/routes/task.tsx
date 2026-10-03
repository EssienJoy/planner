import type { Route } from "./+types/task"
import { ArrowLeft, CheckCheck } from "lucide-react"
import { Link, useNavigation } from "react-router"

import { getPlan } from "../features/plans/lib/plan"
import AddTask from "../features/Tasks/components/AddTask"
import TasksList from "../features/Tasks/components/TasksList"
import {
	createTask,
	deleteTask,
	editTask,
	getAllTask,
} from "../features/Tasks/lib/task"
import { LoadingSpinner } from "@/components"

export async function loader({ request, params }: Route.LoaderArgs) {
	const cookie = request.headers.get("Cookie")
	const [planResponse, taskResponse] = await Promise.all([
		getPlan(params.planId, { cookie }),
		getAllTask(params.planId, { cookie }),
	])

	return {
		planId: params.planId,
		plan: planResponse.data?.data ?? null,
		tasks: taskResponse.data?.doc ?? [],
		error:
			planResponse.status !== "success"
				? planResponse.message
				: taskResponse.status !== "success"
					? taskResponse.message
					: null,
	}
}

export async function action({ request, params }: Route.ActionArgs) {
	const formData = await request.formData()
	const actionType = formData.get("_action")
	const cookie = request.headers.get("Cookie")
	const taskIdValue = formData.get("taskId")
	const taskId = typeof taskIdValue === "string" ? taskIdValue : null

	try {
		let result

		if (actionType === "create") {
			const task = formData.get("task")
			const dueDateValue = formData.get("dueDate")

			if (typeof task !== "string" || !task.trim()) {
				return {
					_action: actionType,
					error: "Enter a task before adding it.",
				}
			}

			const dueDate =
				typeof dueDateValue === "string" && dueDateValue
					? new Date(`${dueDateValue}T12:00:00.000Z`)
					: new Date()
			if (Number.isNaN(dueDate.getTime())) {
				return {
					_action: actionType,
					error: "Choose a valid due date.",
				}
			}

			result = await createTask(
				{
					planId: params.planId,
					data: { task: task.trim(), dueDate: dueDate.toISOString() },
				},
				{ cookie },
			)
		} else if (actionType === "edit") {
			const task = formData.get("task")
			if (!taskId || typeof task !== "string" || !task.trim()) {
				return {
					_action: actionType,
					taskId,
					error: "Enter a task before saving changes.",
				}
			}

			result = await editTask(
				{ taskId, data: { task: task.trim() } },
				{ cookie },
			)
		} else if (actionType === "toggle") {
			const completed = formData.get("completed")
			if (!taskId || (completed !== "true" && completed !== "false")) {
				return {
					_action: actionType,
					taskId,
					error: "Unable to update task status.",
				}
			}

			result = await editTask(
				{ taskId, data: { completed: completed === "true" } },
				{ cookie },
			)
		} else if (actionType === "delete") {
			if (!taskId) {
				return {
					_action: actionType,
					error: "Select a task to delete.",
				}
			}

			result = await deleteTask(taskId, { cookie })
		} else {
			return { error: "Unknown task action." }
		}

		if (result.status !== "success") {
			return {
				_action: actionType,
				taskId,
				error: result.message || "The task could not be updated.",
			}
		}

		return {
			_action: actionType,
			taskId,
			success: true,
			message:
				actionType === "create"
					? "Task added."
					: actionType === "delete"
						? "Task deleted."
						: "Task updated.",
		}
	} catch (error) {
		return {
			_action: actionType,
			taskId,
			error:
				error instanceof Error
					? error.message
					: "The task could not be updated.",
		}
	}
}

export function HydrateFallback() {
	return <LoadingSpinner label="Loading tasks" />
}

function TasksSkeleton() {
	return (
		<ul className="space-y-3" aria-label="Loading tasks">
			{Array.from({ length: 4 }).map((_, index) => (
				<li
					key={index}
					className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
					<span className="size-5 shrink-0 animate-pulse rounded-md bg-surface-muted" />
					<span className="h-4 flex-1 animate-pulse rounded-md bg-surface-muted" />
					<span className="h-4 w-16 shrink-0 animate-pulse rounded-md bg-surface-muted" />
				</li>
			))}
		</ul>
	)
}

function PlanTasks({ loaderData, actionData }: Route.ComponentProps) {
	const { plan, tasks, error } = loaderData
	const navigation = useNavigation()
	const isReloading = navigation.state === "loading"
	const completedCount = tasks.filter((task) => task.completed).length

	return (
		<section className="mx-auto w-full max-w-5xl space-y-6 pb-8">
			<Link
				to="/plan"
				className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
				<ArrowLeft className="size-4" />
				Back to plans
			</Link>

			<header className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="text-xs font-bold uppercase text-primary">
						Plan workspace
					</p>
					<h1 className="mt-1 text-2xl font-extrabold text-foreground sm:text-3xl">
						{plan?.plan ?? "Plan tasks"}
					</h1>
					<p className="mt-1 text-sm text-foreground-muted">
						Organize the next steps for this plan.
					</p>
				</div>
				<div className="flex items-center gap-2 text-sm text-foreground-muted">
					<CheckCheck className="size-4 text-success" />
					<span>
						{completedCount} of {tasks.length} complete
					</span>
				</div>
			</header>

			{error ? (
				<p
					role="alert"
					className="text-sm font-semibold text-error-foreground">
					{error}
				</p>
			) : null}

			{actionData?.error &&
				actionData._action !== "create" &&
				actionData._action !== "edit" && (
					<p
						role="alert"
						className="rounded-md border border-error/30 bg-error-muted px-4 py-3 text-sm font-semibold text-error-foreground">
						{actionData.error}
					</p>
				)}
			{actionData?.success && typeof actionData.message === "string" && (
				<p
					role="status"
					className="rounded-md border border-success/30 bg-success/10 px-4 py-3 text-sm font-semibold text-success">
					{actionData.message}
				</p>
			)}

			<AddTask actionData={actionData} />
			{isReloading ? (
				<TasksSkeleton />
			) : (
				<TasksList tasks={tasks} actionData={actionData} />
			)}
		</section>
	)
}

export default PlanTasks
