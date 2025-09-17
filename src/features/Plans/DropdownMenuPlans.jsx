import { Link } from "react-router-dom";

import Dropdown from "../../ui/Dropdown";
import { useDeletePlan } from "../../hooks/useDeletePlan";

function DropdownMenuPlans({ planId }) {
	const { deletePlan, isPending: isDeleting } = useDeletePlan();
	return (
		<Dropdown>
			<li>
				<Link to={`/plansPage/${planId}`}>View</Link>
			</li>
			<li>
				<button disabled={isDeleting} onClick={() => deletePlan(planId)}>
					{isDeleting ? "Deleting.." : " Delete"}
				</button>
			</li>
			<li>
				<button>Edit</button>
			</li>
		</Dropdown>
	);
}

export default DropdownMenuPlans;
