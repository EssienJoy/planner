import styled from "styled-components";
import { HiCheck } from "react-icons/hi";

import BoxShadow from "./BoxShadow";
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
		<BoxShadow>
			<Form onSubmit={handleSubmit}>
				<textarea
					name='observations'
					id='observations'
					placeholder='start tracking your goals today...'
					value={goal}
					onChange={(e) => setGoal(e.target.value)}></textarea>

				<Button disabled={isCreating}>
					<span>{goals?.length}</span> <HiCheck />
				</Button>
			</Form>
		</BoxShadow>
	);
}

export default Input;

const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;

	button {
		align-self: center;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	textarea {
		outline: none;
		width: 500px;
		border-radius: 2rem;
		padding: 1rem 2rem;
		height: 5rem;
		resize: none;
		background-color: transparent;
	}

	@media screen and (max-width: 550px) {
		textarea {
			border-radius: 1rem;
			height: 4rem;
			padding: 1.5rem 0.5rem;
		}
	}
`;
