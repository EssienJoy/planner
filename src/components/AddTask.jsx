import { HiCheck } from "react-icons/hi";
import Button from "./ui/Button";
import { useState } from "react";
import { useCreateTask } from "../hooks/useCreateTask";

function AddTask() {
	const [task, setTask] = useState("");
	const { createTask, isPending: isCreating } = useCreateTask();

	function handleSubmit(e) {
		e.preventDefault();

		if (!task.trim()) return;

		createTask(
			{
				task,
				dueDate: "2026-1-15",
			},
			{
				onSuccess: () => setTask(""),
			},
		);
	}
	return (
		<form
			className=' flex flex-col sm:flex-row gap-5 items-center p-2  rounded-2xl sm:rounded-4xl sm:p-4 bg-secondary text-primary '
			onSubmit={handleSubmit}>
			<textarea
				className=' w-full sm:w-[60%] rounded-3xl p-3 sm:p-6 text-sm sm:text-lg focus:outline-none '
				name='observations'
				id='observations'
				placeholder='start tracking your goals today...'
				value={task}
				onChange={(e) => setTask(e.target.value)}></textarea>

			<Button
				className='flex self-start gap-1  items-center sm:self-center text-sm'
				bg='bg-primary'
				text='text-secondary'
				disabled={isCreating}>
				<span>{isCreating ? "creating..." : " Create"}</span> <HiCheck />
			</Button>
		</form>
	);
}

export default AddTask;
