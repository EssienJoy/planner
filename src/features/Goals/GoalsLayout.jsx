import { useNavigate, useParams } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

import LayoutContainer from "../../ui/LayoutContainer";
import NavBar from "../../ui/NavBar";
import BoxShadow from "../../ui/BoxShadow";
import AddGoal from "../../ui/AddGoal";
import SunkenLayout from "../../ui/SunkenLayout";

import { usePlan } from "../../hooks/usePlan";
import Button from "../../ui/Button";
import Goals from "./Goals";
import { useGoals } from "../../hooks/useGoals";

function GoalsLayout() {
	const { planId } = useParams();
	const { plan, isLoading } = usePlan(planId);
	const { goals, isLoading: isLoadingGoal } = useGoals(planId);

	const navigate = useNavigate();

	if (isLoading) return <div className='spinner'></div>;

	return (
		<BoxShadow>
			<Button onClick={() => navigate(-1)}>
				<HiArrowLeft />
			</Button>

			<SunkenLayout style={{ marginTop: "1rem" }} as='h2'>
				{plan?.title}
			</SunkenLayout>
			<Goals goals={goals} isLoadingGoal={isLoadingGoal} plan={plan} />
			<AddGoal goals={goals} planId={planId} />
		</BoxShadow>
	);
}

export default GoalsLayout;
