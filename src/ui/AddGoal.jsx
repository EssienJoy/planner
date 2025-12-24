import { HiCheck } from "react-icons/hi";

import Button from "./Button";
import { useState } from "react";
import { useCreateGoal } from "../hooks/useCreateGoal";

function Input({ goals, planId }) {
	const [goal, setGoal] = useState("");
	const { createGoal, isPending: isCreating } = useCreateGoal();

	function handleSubmit(e) {
		e.preventDefault();

		if (!goal.trim()) return;

		createGoal(
			{
				planId: Number(planId),
				text: goal,
				completed: false,
			},
			{
				onSuccess: () => setGoal(""),
			}
		);
	}
	return (
		<form
			className='custom-shadow p-2 flex flex-col sm:flex-row gap-5 items-center  rounded-2xl sm:rounded-4xl sm:p-4'
			onSubmit={handleSubmit}>
			<textarea
				className=' border w-full sm:w-[60%] rounded-3xl p-3 sm:p-6 text-sm sm:text-lg focus:outline-none '
				name='observations'
				id='observations'
				placeholder='start tracking your goals today...'
				value={goal}
				onChange={(e) => setGoal(e.target.value)}></textarea>

			<Button
				className='flex self-start  items-center sm:self-center'
				disabled={isCreating}>
				<span>{goals?.length}</span> <HiCheck />
			</Button>
		</form>
	);
}

export default Input;
