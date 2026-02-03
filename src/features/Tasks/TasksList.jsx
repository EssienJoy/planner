import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

import { useEditTask } from "../../hooks/useEditTask";
// import { format } from "date-fns";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { useModal } from "../../hooks/useModal";
import { useDeleteTask } from "../../hooks/useDeleteTask";
import { HiCheck } from "react-icons/hi2";

function TasksList({ tasks, isTasking }) {
	const { deleteTask } = useDeleteTask();
	const { editTask, isPending: isTracking } = useEditTask();
	const [selectedId, setSelectedId] = useState(null);
	const [completedTask, setIsCompletedTask] = useState(null);
	const { open, isOpen, close } = useModal();
	const [taskToDelete, setTaskToDelete] = useState(null);
	const [updateTask, setUpdateTask] = useState("");
	const [selected, setSelected] = useState(null);

	function handleSubmit(taskId) {
		editTask(
			{
				id: taskId,
				data: {
					task: updateTask,
				},
			},
			{
				onSuccess: () => {
					setUpdateTask("");
					setSelected(null);
				},
			},
		);
	}

	const completed = tasks?.filter((task) => task.completed);

	function handleToggleMenu(id) {
		setSelectedId((taskId) => (taskId === id ? null : id));
	}

	function handleCompleting(id) {
		setIsCompletedTask(id);
	}

	function handleDelete() {
		deleteTask(taskToDelete);
		close();
		setTaskToDelete(null);
	}

	return (
		<>
			<Modal isOpen={isOpen} close={close}>
				<Modal.Title>
					<p>Are you sure you want to delete this task?</p>
				</Modal.Title>
				<Modal.Actions>
					<Button className='w-full' bg='bg-[#fc0000]' onClick={handleDelete}>
						Yes
					</Button>

					<Button className='w-full' onClick={close}>
						No
					</Button>
				</Modal.Actions>
			</Modal>
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
						<li key={task._id}>
							<div className='bg-secondary text-primary py-3 px-2 my-5 relative flex items-center gap-5 sm:gap-8 rounded-2xl border-b-2 border-b-[#cececf]'>
								<input
									className='w-6 h-6 shrink-0 sm:w-8 sm:h-8'
									type='checkbox'
									checked={task.completed}
									onChange={(e) => {
										handleCompleting(task._id);
										editTask({
											id: task._id,
											data: { completed: e.target.checked },
										});
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
									<ul className='absolute top-16 right-0 bg-secondary text-primary rounded-2xl list-none z-35 w-[120px] p-4 flex flex-col gap-2 text-sm'>
										<li>
											<button
												onClick={() => {
													setTaskToDelete(task._id);
													open();
												}}>
												Delete
											</button>
										</li>

										<li>
											<button
												onClick={() => {
													setSelected((id) => {
														return id === task._id ? null : task._id;
													});
												}}>
												Edit
											</button>
										</li>

										{task?.completed && (
											<li>
												<button
													onClick={() =>
														editTask({
															id: task._id,
															data: { completed: false },
														})
													}
													disabled={isTracking}>
													{isTracking ? "Untracking..." : "Untrack"}
												</button>
											</li>
										)}
									</ul>
								)}
							</div>
							{selected === task._id && (
								<form
									className=' flex flex-col sm:flex-row gap-5 items-center p-2  rounded-2xl sm:rounded-4xl sm:p-4 bg-secondary text-primary '
									onSubmit={(e) => {
										e.preventDefault();
										handleSubmit(task._id);
									}}>
									<textarea
										className=' w-full sm:w-[60%] rounded-3xl p-3 sm:p-6 text-sm sm:text-lg focus:outline-none '
										name='task'
										id='task'
										placeholder='start tracking your task...'
										value={updateTask}
										// defaultValue={task.task}
										onChange={(e) => setUpdateTask(e.target.value)}></textarea>

									<Button
										type='submit'
										className='flex self-start gap-1  items-center sm:self-center text-sm'
										bg='bg-primary'
										text='text-secondary'
										disabled={isTracking}>
										<span>{isTracking ? "editing..." : " Edit"}</span>{" "}
										<HiCheck />
									</Button>
								</form>
							)}
						</li>
					))
				)}
			</ul>
		</>
	);
}

export default TasksList;
