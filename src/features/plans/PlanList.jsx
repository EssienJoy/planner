import { usePlans } from "../../hooks/usePlans";
import { Link } from "react-router-dom";
import { TbEye } from "react-icons/tb";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useDeletePlan } from "../../hooks/useDeletePlan";
import { format } from "date-fns";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { useModal } from "../../hooks/useModal";
import { HiCheck } from "react-icons/hi2";
import { useState } from "react";
import { useEditPlan } from "../../hooks/useEditPlan";

function PlanList({ id }) {
	const { editPlan, isPending } = useEditPlan();
	const [planState, setCreatePlanState] = useState("");
	const { plans, isLoading } = usePlans(id);
	const { deletePlan } = useDeletePlan();
	const { open, isOpen, close } = useModal();
	const [selected, setSelected] = useState(null);
	const [planToDelete, setPlanToDelete] = useState(null);

	function handleSubmit(planId) {
		editPlan(
			{
				plan: {
					plan: planState,
				},
				planId,
			},
			{
				onSuccess: () => {
					setCreatePlanState("");
					setSelected(null);
				},
			},
		);
	}

	function handleDelete() {
		deletePlan(planToDelete);
		close();
		setPlanToDelete(null);
	}

	return (
		<>
			<Modal isOpen={isOpen} close={close}>
				<Modal.Title>
					<p>Are you sure you want to delete this plan?</p>
				</Modal.Title>
				<Modal.Actions>
					<Button bg='bg-[#fc0000]' onClick={handleDelete}>
						Yes
					</Button>

					<Button onClick={close}>No</Button>
				</Modal.Actions>
			</Modal>
			<section>
				{isLoading ? (
					<div className='spinner'></div>
				) : (
					<ul className='grid sm:grid-cols-2 gap-5'>
						{plans?.map((plan) => (
							<li key={plan._id}>
								<div
									className='bg-secondary text-white 
								p-4 rounded-2xl  '>
									<div className='flex justify-between items-center'>
										<p className=''>{plan.plan}</p>
										<Link
											to={`/plans/${plan._id}`}
											className='p-1 sm:hover:scale-110'>
											<TbEye size='2rem' />
										</Link>
									</div>
									<p>2 tasks Completed</p>
									<div className='flex justify-between gap-2 items-center'>
										<p className='text-xs'>
											{format(plan?.createdAt, "MMM yyyy")}
										</p>
										<div className='flex '>
											<button
												className='p-1 hover:text-red-500'
												onClick={() => {
													setPlanToDelete(plan._id);
													open();
												}}>
												<MdOutlineDeleteForever size='1.5rem' />
											</button>
											<button
												onClick={() => {
													setSelected((id) => {
														return id === plan._id ? null : plan._id;
													});
												}}
												className='p-1'>
												<FaRegEdit size='1.25rem' />
											</button>
										</div>
									</div>
								</div>

								{selected === plan._id && (
									<form
										onSubmit={(e) => {
											e.preventDefault();
											handleSubmit(plan._id);
										}}
										className='bg-secondary text-secondary rounded-2xl 
									 p-4 mt-5 flex flex-col gap-4'>
										<label
											htmlFor='plans'
											className='text-md  font-bold text-primary'>
											Edit a plan
										</label>
										<div className='flex flex-col sm:flex-row  gap-5 sm:items-center'>
											<textarea
												className='bg-white p-4 grow rounded-2xl h-15 text-sm'
												name='plans'
												id='plans'
												value={planState}
												required
												defaultValue={plan.plan}
												onChange={(e) => setCreatePlanState(e.target.value)}
											/>
											<Button
												type='submit'
												disabled={isPending}
												bg='bg-primary'
												text='text-secondary'
												className='flex items-center self-start  sm:self-center gap-2 text-sm'>
												<HiCheck />
												{isPending ? "editing..." : "Edit"}
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
	);
}

export default PlanList;
