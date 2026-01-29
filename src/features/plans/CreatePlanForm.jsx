import { HiCheck } from "react-icons/hi2";
import { useState } from "react";
import { useCreatePlan } from "../../hooks/useCreatePlan";
import Button from "../../components/ui/Button";

function CreatePlanForm({ user }) {
	const { createPlan, isPending: isCreating } = useCreatePlan();

	const [plan, setCreatePlan] = useState("");

	function handleSubmit(e) {
		e.preventDefault();

		createPlan(
			{
				user: user._id,
				plan,
			},
			{
				onSuccess: () => {
					setCreatePlan("");
				},
			},
		);
	}
	return (
		<form
			onSubmit={handleSubmit}
			className='bg-secondary text-secondary rounded-2xl sm:rounded-4xl p-4 sm:p-10 flex flex-col gap-7'>
			<label
				htmlFor='plans'
				className='text-md sm:text-lg font-bold text-primary'>
				Create a plan
			</label>
			<div className='flex flex-col sm:flex-row  gap-5 sm:items-center'>
				<textarea
					className='bg-white p-4 grow rounded-2xl h-20 text-sm sm:text-lg'
					name='plans'
					id='plans'
					placeholder='Write your plan here...'
					value={plan}
					required
					onChange={(e) => setCreatePlan(e.target.value)}
				/>
				<Button
					type='submit'
					disabled={isCreating}
					bg='bg-primary'
					text='text-secondary'
					className='flex items-center self-start  sm:self-center gap-2 text-sm'>
					<HiCheck />
					{isCreating ? "creating..." : "Add"}
				</Button>
			</div>
		</form>
	);
}

export default CreatePlanForm;
