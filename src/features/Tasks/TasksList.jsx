import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

import DropdownMenuTasks from "./DropdownMenuTasks";
import { useEditTask } from "../../hooks/useEditTask";
// import { format } from "date-fns";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";

function TasksList({ tasks, isTasking }) {
	const { editTask, isPending: isTracking } = useEditTask();
	const [selectedId, setSelectedId] = useState(null);
	const [completedTask, setIsCompletedTask] = useState(null);

	const completed = tasks?.filter((task) => task.completed);

	function handleToggleMenu(id) {
		setSelectedId((taskId) => (taskId === id ? null : id));
	}

	function handleCompleting(id) {
		setIsCompletedTask(id);
	}

	return (
		<>
			<div className='flex items-center justify-between font-bold text-md sm:text-xl gap-3 flex-wrap my-3'>
				<h3>
					{completed?.length === 0
						? "Zero commpleted tasks"
						: `You Completed ${completed?.length} tasks`}
				</h3>
				{/* <h3> {format(new Date(plan?.dateCreated), "MMM do")}</h3> */}
			</div>

			<ul className=' h-[50dvh]'>
				{isTasking ? (
					<div className='spinner'></div>
				) : (
					tasks?.map((task) => (
						<li
							key={task._id}
							className='bg-secondary text-primary py-3 px-2 my-5 relative flex items-center gap-5 sm:gap-8 rounded-2xl border-b-2 border-b-[#cececf]'>
							<input
								className='w-6 h-6 shrink-0 sm:w-8 sm:h-8'
								type='checkbox'
								checked={task.completed}
								onChange={(e) => {
									handleCompleting(task._id);
									editTask(
										{
											id: task._id,
											data: { completed: e.target.checked },
										},
										{
											onSuccess: () =>
												toast.success("Task tracked succesfully"),
										},
										{
											onError: (err) =>
												toast.error(`Error tracking goal ${err}`),
										},
									);
								}}
								disabled={
									task.completed === true ||
									(completedTask === task._id && isTracking)
								}
							/>
							<p className='text-xs sm:text-lg grow'>{task.task}</p>
							<Button
								className='justify-self-center'
								onClick={() => handleToggleMenu(task._id)}>
								<HiOutlineDotsVertical />
							</Button>
							{selectedId === task._id && (
								<DropdownMenuTasks task={task} taskId={task._id} />
							)}
						</li>
					))
				)}
			</ul>
		</>
	);
}

export default TasksList;
