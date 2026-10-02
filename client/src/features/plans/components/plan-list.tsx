import { useState } from "react"
import { Link, useNavigation, useSubmit } from "react-router"
import { TbEye } from "react-icons/tb"
import { MdOutlineDeleteForever } from "react-icons/md"
import { FaRegEdit } from "react-icons/fa"
import { HiCheck } from "react-icons/hi2"
import { format } from "date-fns"
import { ClipboardList } from "lucide-react"

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	Button,
} from "../../../components"

function PlanList({ plans, onCreatePlan }) {
	// console.log(plans)
	const submit = useSubmit()
	const navigation = useNavigation()

	const [selected, setSelected] = useState<string | null>(null)
	const [planToDelete, setPlanToDelete] = useState<string | null>(null)

	const isPending = navigation.state === "submitting"

	const handleDelete = () => {
		if (!planToDelete) return

		const formData = new FormData()

		formData.append("_action", "delete")
		formData.append("planId", planToDelete)

		submit(formData, {
			method: "post",
		})

		setPlanToDelete(null)
	}

	const handleEdit = (
		event: React.FormEvent<HTMLFormElement>,
		planId: string,
	) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)

		formData.append("_action", "edit")
		formData.append("planId", planId)

		submit(formData, {
			method: "post",
		})

		setSelected(null)
	}

	return (
		<>
			<AlertDialog
				open={Boolean(planToDelete)}
				onOpenChange={(open) => {
					if (!open) setPlanToDelete(null)
				}}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete this plan?</AlertDialogTitle>
						<AlertDialogDescription>
							This will permanently delete this plan. This action
							cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => setPlanToDelete(null)}
							disabled={isPending}>
							No, keep plan
						</Button>

						<Button
							type="button"
							variant="destructive"
							onClick={handleDelete}
							disabled={isPending}>
							{isPending ? "Deleting..." : "Yes, delete plan"}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<section>
				{!plans || plans.length === 0 ? (
					<div className="rounded-3xl border border-dashed border-border bg-surface px-6 py-16 text-center shadow-sm">
						<span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary-subtle text-primary">
							<ClipboardList className="size-7" />
						</span>
						<h3 className="mt-5 text-xl font-extrabold tracking-tight text-foreground">
							No plans yet
						</h3>
						<p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-foreground-muted">
							Welcome! Create your first plan below and start
							turning your day into focused action.
						</p>
						<button
							type="button"
							onClick={onCreatePlan}
							className="mt-6 inline-flex h-10 items-center justify-center gap-1.5 rounded-md bg-primary px-5 text-sm font-medium text-white transition-all hover:bg-primary/90">
							Create your first plan
						</button>
					</div>
				) : (
					<ul className="grid gap-5 sm:grid-cols-2">
						{plans.map((plan) => (
							<li key={plan._id}>
								<div className="rounded-2xl border border-border bg-surface p-4 shadow-sm transition-shadow hover:shadow-md">
									<div className="flex items-center justify-between">
										<p className="font-bold text-foreground">
											{plan.plan}
										</p>

										<Link
											to={`/plan/${plan._id}`}
											className="rounded-lg p-1 text-primary transition-transform hover:scale-110">
											<TbEye size="2rem" />
										</Link>
									</div>

									<p className="mt-1 text-xs text-foreground-muted">
										2 tasks Completed
									</p>

									<div className="flex items-center justify-between gap-2">
										<p className="text-xs text-foreground-muted">
											{format(
												new Date(plan.createdAt),
												"MMM yyyy",
											)}
										</p>

										<div className="flex">
											{/* DELETE */}
											<button
												type="button"
												className="rounded-lg p-1.5 text-foreground-muted transition-colors hover:bg-error-muted hover:text-error"
												onClick={() => {
													setPlanToDelete(plan._id)
												}}>
												<MdOutlineDeleteForever size="1.5rem" />
											</button>

											{/* EDIT */}
											<button
												type="button"
												className="rounded-lg p-1.5 text-foreground-muted transition-colors hover:bg-primary-subtle hover:text-primary"
												onClick={() => {
													setSelected((id) =>
														id === plan._id
															? null
															: plan._id,
													)
												}}>
												<FaRegEdit size="1.25rem" />
											</button>
										</div>
									</div>
								</div>

								{selected === plan._id && (
									<form
										onSubmit={(event) =>
											handleEdit(event, plan._id)
										}
										className="mt-5 flex flex-col gap-4 rounded-2xl border border-border bg-background p-4">
										<label
											htmlFor={`plan-${plan._id}`}
											className="text-sm font-bold text-primary">
											Edit a plan
										</label>

										<div className="flex flex-col gap-5 sm:flex-row sm:items-center">
											<textarea
												className="h-15 grow rounded-2xl border border-input-border bg-input p-4 text-sm text-foreground placeholder:text-input-placeholder focus:border-input-focus focus:outline-none"
												name="plan"
												id={`plan-${plan._id}`}
												defaultValue={plan.plan}
												required
											/>

											<Button
												type="submit"
												disabled={isPending}
												className="
                                                flex
                                                items-center
                                                gap-2
                                                self-start
                                                text-sm
                                                sm:self-center
                                            ">
												<HiCheck />

												{isPending
													? "Editing..."
													: "Edit"}
											</Button>
										</div>
									</form>
								)}
							</li>
						))}
					</ul>
				)}
			</section>
		</>
	)
}

export default PlanList
