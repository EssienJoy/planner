import { useNavigate, useParams } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

import AddGoal from "../../ui/AddGoal";
import SunkenLayout from "../../ui/SunkenLayout";

import { usePlan } from "../../hooks/usePlan";
import Button from "../../ui/Button";
import Goals from "./Goals";
import { useGoals } from "../../hooks/useGoals";
import Container from "../../ui/Container";

function GoalsLayout() {
	const { planId } = useParams();
	const { plan, isLoading } = usePlan(planId);
	const { goals, isLoading: isLoadingGoal } = useGoals(planId);

	const navigate = useNavigate();

	if (isLoading) return <div className='spinner'></div>;

	return (
		<Container className='custom-shadow mt-5 p-4'>
			<Button onClick={() => navigate(-1)}>
				<HiArrowLeft />
			</Button>

			<h2 className='sunken-shadow mt-4 font-bold p-3 rounded-2xl text-xl'>
				{plan?.title}
			</h2>
			<Goals goals={goals} isLoadingGoal={isLoadingGoal} plan={plan} />
			<AddGoal goals={goals} planId={planId} />
		</Container>
	);
}

export default GoalsLayout;
