import toast from "react-hot-toast";
import { useDeleteGoal } from "../../hooks/useDeleteGoal";
import { useEditGoal } from "../../hooks/useEditGoal";
import Dropdown from "../../ui/Dropdown";

function DropdownMenuGoals({ goalId, goal }) {
	const { deleteGoal, isPending: isDeleting } = useDeleteGoal();
	const { editGoal, isPending: isUntracking } = useEditGoal();

	return (
		<Dropdown>
			<li>
				<button onClick={() => deleteGoal(goalId)} disabled={isDeleting}>
					{isDeleting ? "Deleting..." : "Delete"}
				</button>
			</li>
			<li>Edit</li>
			{goal?.completed === false || (
				<li>
					<button
						onClick={() =>
							editGoal(
								{
									goalId,
									data: { ...goal, completed: false },
								},
								{
									onSuccess: () => toast.success("Goal untracked succesfully"),
								},
								{
									onError: (err) => toast.error(`Error untracking goal ${err}`),
								}
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

export default DropdownMenuGoals;
