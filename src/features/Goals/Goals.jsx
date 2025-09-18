import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import styled from "styled-components";

import Button from "../../ui/Button";
import DropdownMenuGoals from "./DropdownMenuGoals";
import { useEditGoal } from "../../hooks/useEditGoal";
import { useUser } from "../../hooks/useUser";
import { format } from "date-fns";
import toast from "react-hot-toast";

function Goals({ goals, isLoadingGoal, plan }) {
	const { editGoal, isPending: isTracking } = useEditGoal();
	const { user } = useUser();
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
			<Div>
				<h3>
					{user?.name} Completed {completed?.length || 0} Goal
				</h3>
				<h3> {format(new Date(plan?.dateCreated), "MMM do")}</h3>
			</Div>

			<Ul>
				{isLoadingGoal ? (
					<div className='spinner'></div>
				) : (
					goals?.map((goal) => (
						<li key={goal.id} className='list'>
							<input
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
							<p>{goal.text}</p>
							<Button onClick={() => handleToggleMenu(goal.id)}>
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

const Div = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 0.5rem;
	flex-wrap: wrap;
	font-weight: bold;
	margin: 2rem 0;

	@media screen and (max-width: 550px) {
		margin: 1rem 0;
		h3 {
			padding: 0;
		}
	}
`;
