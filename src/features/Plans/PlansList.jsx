import { HiOutlineDotsVertical } from "react-icons/hi";
import { useState } from "react";
import styled from "styled-components";

import Button from "../../ui/Button";
import DropdownMenuPlans from "./DropdownMenuPlans";
import { format } from "date-fns";

function PlansList({ plans }) {
	const [selectedId, setSelectedId] = useState(null);

	function handleToggleMenu(id) {
		setSelectedId((prevId) => (prevId === id ? null : id));
	}

	return (
		<StyledPlansList>
			{plans.map((plan) => (
				<li key={plan.id}>
					<p>{format(new Date(plan.dateCreated), "MMM do")}</p>
					<p>{plan.title}</p>

					<Button onClick={() => handleToggleMenu(plan.id)}>
						<HiOutlineDotsVertical />
					</Button>
					{selectedId === plan.id && <DropdownMenuPlans planId={plan.id} />}
				</li>
			))}
		</StyledPlansList>
	);
}

export default PlansList;

const StyledPlansList = styled.ul`
	padding: 0 1rem;
	overflow-y: scroll;

	height: 100dvh;

	@media (max-width: 1000px) {
		height: 50dvh;
	}

	li {
		position: relative;
		font-size: 1rem;
		display: grid;
		grid-template-columns: 2fr 3fr 1fr;
		gap: 1rem;
		border-radius: 1rem;
		padding: 0.5rem 1rem;

		margin: 1rem 0;
		border-bottom: 2px solid #cececf;

		button {
			align-self: center;
			justify-self: center;
		}
	}

	@media (max-width: 550px) {
		padding: 0;
		li {
			font-size: 0.85rem;
		}
	}
`;
