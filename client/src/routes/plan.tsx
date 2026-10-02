import type { Route } from "./+types/plan"
import { Plus, X } from "lucide-react"
import { useTogglePlan } from "../features/plans/hooks/useTogglePlan"
import { getCurrentUser } from "../api/user"
import {
	createPlan,
	deletePlan,
	editPlan,
	getAllPlans,
} from "../features/plans/lib/plan"

import PlanList from "../features/plans/components/plan-list"
import CreatePlanForm from "../features/plans/components/create-plan-form"
import { Button, LoadingSpinner } from "@/components"

export async function loader({ request }: Route.LoaderArgs) {
	const cookie = request.headers.get("Cookie")
	const [user, plans] = await Promise.all([
		getCurrentUser(cookie),
		getAllPlans({ cookie }),
	])

	return {
		user: user.data,
		plans: plans.data,
	}
}

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData()
	const cookie = request.headers.get("Cookie")

	const action = formData.get("_action")

	if (action === "delete") {
		const planId = formData.get("planId")

		if (typeof planId !== "string") {
			return {
				error: "Invalid plan ID",
			}
		}

		return await deletePlan(planId, { cookie })
	}

	if (action === "edit") {
		const planId = formData.get("planId")
		const plan = formData.get("plan")

		if (
			typeof planId !== "string" ||
			typeof plan !== "string" ||
			!plan.trim()
		) {
			return {
				error: "Invalid plan data",
			}
		}

		return await editPlan(
			{
				planId,
				plan: plan.trim(),
			},
			{ cookie },
		)
	}

	if (action === "create") {
		const plan = formData.get("plan")

		if (typeof plan !== "string" || !plan.trim()) {
			return {
				_action: "create",
				error: "Plan is required",
			}
		}

		try {
			const result = await createPlan({ plan: plan.trim() }, { cookie })

			if (result.status !== "success") {
				return {
					_action: "create",
					error: result.message || "Unable to create the plan.",
				}
			}

			return {
				_action: "create",
				success: true,
				message: "Plan created successfully.",
			}
		} catch (error) {
			return {
				_action: "create",
				error:
					error instanceof Error
						? error.message
						: "Unable to create the plan.",
			}
		}
	}

	return {
		error: "Unknown action",
	}
}

export function HydrateFallback() {
	return <LoadingSpinner label="Loading plans" />
}

function PlanLayout({ loaderData }: Route.ComponentProps) {
	const { plans } = loaderData
	const { showForm, setShowForm } = useTogglePlan()

	const handleCreatePlan = () => {
		setShowForm(true)
		setTimeout(() => {
			document
				.getElementById("create-plan")
				?.scrollIntoView({ behavior: "smooth", block: "center" })
		}, 50)
	}

	const handleToggleCreateForm = () => {
		if (showForm) {
			setShowForm(false)
			return
		}

		handleCreatePlan()
	}
	// console.log(user, plans)

	return (
		<div className="space-y-5">
			<div className="flex justify-end">
				<Button
					type="button"
					onClick={handleToggleCreateForm}
					aria-expanded={showForm}
					aria-controls="create-plan">
					{showForm ? (
						<X aria-hidden="true" className="size-4" />
					) : (
						<Plus aria-hidden="true" className="size-4" />
					)}
					{showForm ? "Close" : "Create plan"}
				</Button>
			</div>
			{showForm && <CreatePlanForm />}
			<PlanList plans={plans.doc} onCreatePlan={handleCreatePlan} />
		</div>
	)
}

export default PlanLayout
