import React, { useState } from "react";
import { HiCheck } from "react-icons/hi2";
import { useEditPlan } from "../hooks/useEditPlan";
import Button from "../../../components/ui/Button";

export const EditPlanForm = ({ setSelected, plan }) => {
	const { editPlan, isPending } = useEditPlan();
	const [planState, setCreatePlanState] = useState("");
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
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit(plan._id);
			}}
			className='bg-primary text-white rounded-2xl 
									 p-4 mt-5 flex flex-col gap-4'>
			<label htmlFor='plans' className='text-md  font-bold '>
				Edit a plan
			</label>
			<div className='flex flex-col sm:flex-row  gap-5 sm:items-center'>
				<textarea
					className='bg-white text-black p-4 grow rounded-2xl h-15 text-sm 
                    outline-none'
					name='plans'
					id='plans'
					value={planState}
					required
					defaultValue={plan.plan}
					onChange={(e) => setCreatePlanState(e.target.value)}
				/>
				<Button
					type='submit'
					variant='secondary'
					disabled={isPending}
					className='flex items-center self-start  sm:self-center gap-2 text-sm'>
					<HiCheck />
					{isPending ? "editing..." : "Edit"}
				</Button>
			</div>
		</form>
	);
};
