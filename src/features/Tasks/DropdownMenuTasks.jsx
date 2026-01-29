import toast from "react-hot-toast";
import { useEditTask } from "../../hooks/useEditTask";
import Dropdown from "../../components/ui/Dropdown";

function DropdownMenuTasks({ taskId, task }) {
	const { editTask, isPending: isUntracking } = useEditTask();

	return (
		<Dropdown>
			<li>
				<button>Delete</button>
			</li>
			<li>Edit</li>
			{task?.completed === false || (
				<li>
					<button
						onClick={() =>
							editTask(
								{
									id: taskId,
									data: { completed: false },
								},
								{
									onSuccess: () => toast.success("Task untracked succesfully"),
								},
								{
									onError: (err) => toast.error(`Error untracking goal ${err}`),
								},
							)
						}
						disabled={isUntracking}>
						{isUntracking ? "Untracking..." : "Untrack"}
					</button>
				</li>
			)}
		</Dropdown>
	);
}

export default DropdownMenuTasks;
