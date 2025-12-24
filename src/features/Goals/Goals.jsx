import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import styled from "styled-components";

import Button from "../../ui/Button";
import DropdownMenuGoals from "./DropdownMenuGoals";
import { useEditGoal } from "../../hooks/useEditGoal";
import { format } from "date-fns";
import toast from "react-hot-toast";

function Goals({ goals, isLoadingGoal, plan }) {
	const { editGoal, isPending: isTracking } = useEditGoal();
	const [selectedId, setSelectedId] = useState(null);
	const [completedGoal, setIsCompletedGoal] = useState(null);

	const completed = goals?.filter((goal) => goal.completed);

	function handleToggleMenu(id) {
		setSelectedId((goalId) => (goalId === id ? null : id));
	}

	function handleCompleting(id) {
		setIsCompletedGoal(id);
	}

	return (
		<>
			<div className='flex items-center justify-between font-bold text-md sm:text-xl  gap-3 flex-wrap my-3'>
				<h3>
					You Completed <span>{completed?.length || 0}</span> Goals
				</h3>
				<h3> {format(new Date(plan?.dateCreated), "MMM do")}</h3>
			</div>

			<Ul>
				{isLoadingGoal ? (
					<div className='spinner'></div>
				) : (
					goals?.map((goal) => (
						<li
							key={goal.id}
							className='py-3 px-2 my-5 relative flex items-center gap-5 rounded-2xl border-b-2 border-b-[#cececf]'>
							<input
								className='w-4 h-4 shrink-0 sm:w-8 sm:h-8'
								type='checkbox'
								checked={goal.completed}
								onChange={(e) => {
									handleCompleting(goal.id);
									editGoal(
										{
											goalId: goal.id,
											data: { ...goal, completed: e.target.checked },
										},
										{
											onSuccess: () =>
												toast.success("Goal tracked succesfully"),
										},
										{
											onError: (err) =>
												toast.error(`Error tracking goal ${err}`),
										}
									);
								}}
								disabled={
									goal.completed === true ||
									(completedGoal === goal.id && isTracking)
								}
							/>
							<p className='text-xs sm:text-lg grow'>{goal.text}</p>
							<Button
								className='justify-self-center'
								onClick={() => handleToggleMenu(goal.id)}>
								<HiOutlineDotsVertical />
							</Button>
							{selectedId === goal.id && (
								<DropdownMenuGoals goal={goal} goalId={goal.id} />
							)}
						</li>
					))
				)}
			</Ul>
		</>
	);
}

export default Goals;

const Ul = styled.ul`
	overflow-y: scroll;
	height: 50dvh;
	padding: 0 1rem;

	.list {
		position: relative;
		display: flex;
		align-items: center;
		gap: 2rem;
		border-radius: 1rem;
		padding: 0.5rem 1rem;
		margin: 2rem 0;
		border-bottom: 2px solid #cececf;

		p {
			flex-grow: 1;
		}

		input {
			height: 2rem;
			width: 2rem;
			flex-shrink: 0;
		}
	}

	@media screen and (max-width: 550px) {
		padding: 0;
		/list {
			gap: 1rem;
			input {
				height: 1.5rem;
				width: 1.5rem;
			}
		}
	}
`;
