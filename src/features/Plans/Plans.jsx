import BoxShadow from "../../ui/BoxShadow";
import styled from "styled-components";
import Row from "../../ui/Row";

import { usePlans } from "../../hooks/usePlans";
import Calendar from "../../ui/Calendar";
import PlansList from "./PlansList";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import Button from "../../ui/Button";
import { HiCheck } from "react-icons/hi2";
import { useState } from "react";
import { useCreatePlan } from "../../hooks/useCreatePlan";
import { useUser } from "../../hooks/useUser";

function Plans() {
	const [plan, setCreatePlan] = useState("");
	const [date, setDate] = useState("");

	const { isAuthenticated } = useAuth();
	const { plans, isLoading } = usePlans();
	const { createPlan, isPending: isCreating } = useCreatePlan();
	const { user } = useUser();

	function handleSubmit(e) {
		e.preventDefault();

		createPlan(
			{
				userId: user.id,
				title: plan,
				dateCreated: date,
			},
			{
				onSuccess: () => setCreatePlan(""),
			}
		);
	}

	return isAuthenticated ? (
		<Row type='horizontal'>
			<>
				<StyledPlansContainer>
					{isLoading ? (
						<div className='spinner'></div>
					) : (
						<>
							<h2>
								{user?.name} has {plans?.length} planned goals
							</h2>
							<PlansList plans={plans} />
						</>
					)}
				</StyledPlansContainer>

				<Row type='vertical'>
					<StyledWrapper>
						<form onSubmit={handleSubmit}>
							<label htmlFor='plans'>Create a plan</label>
							<div className='textarea-row'>
								<TextArea
									name='plans'
									id='plans'
									placeholder='Write your plan here...'
									value={plan}
									required
									onChange={(e) => setCreatePlan(e.target.value)}
								/>
								<Button type='submit' disabled={isCreating}>
									<HiCheck />
									{isCreating ? "creating..." : "Add"}
								</Button>
							</div>

							<div className='date-row'>
								<label htmlFor='date'>Select a date</label>
								<input
									type='date'
									id='date'
									value={date}
									onChange={(e) => setDate(e.target.value)}
									required
								/>
							</div>
						</form>
					</StyledWrapper>

					<Calendar>
						<BoxShadow>
							<Calendar.Grid />
						</BoxShadow>
					</Calendar>
				</Row>
			</>
		</Row>
	) : (
		<p>
			You have no plans, login to{" "}
			<Link className='underline' to='/login'>
				get started
			</Link>
		</p>
	);
}

export default Plans;

const StyledWrapper = styled(BoxShadow)`
	form {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	label {
		font-weight: 600;
		color: #555;
		margin-bottom: 0.25rem;
	}

	.textarea-row {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.date-row {
		display: flex;
		flex-direction: column;
	}

	input[type="date"] {
		padding: 0.75rem 1rem;
		border-radius: 1rem;
		border: 1px solid #ccc;
		background: #fafafa;
		transition: border 0.2s;
		outline: none;

		&:focus {
			border-color: #4f46e5;
		}
	}

	@media (max-width: 550px) {
		form {
			padding: 0.5rem;
		}

		.textarea-row {
			display: flex;
			align-items: stretch;
			flex-direction: column;

			button {
				align-self: start;
			}
		}

		input[type="date"] {
			padding: 0.5rem 1rem;
		}
	}
`;

const TextArea = styled.textarea`
	flex: 1;
	outline: none;
	border: 1px solid #ccc;
	border-radius: 1rem;
	padding: 1rem 1.25rem;
	height: 5rem;
	resize: none;
	background-color: #fafafa;
	transition: border 0.2s, box-shadow 0.2s;

	&:focus {
		border-color: #4f46e5;
		box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
	}
`;

const StyledPlansContainer = styled(BoxShadow)`
	flex-grow: 1;

	h2 {
		font-weight: bold;
		font-size: 1.25rem;
		padding: 0.5rem;
	}
`;
