import { usePlan } from "../../hooks/usePlan";
import { useParams } from "react-router-dom";
import GoBackNavigation from "../../components/ui/GoBackNavigation";
import TasksList from "./TasksList";
import AddTask from "../../components/AddTask";
import Container from "../../components/ui/Container";
import { useTasks } from "../../hooks/useTasks";

function TasksLayout() {
	const { planId } = useParams();
	const { plan, isLoading } = usePlan(planId);
	const { tasks, isLoading: isTasking } = useTasks();

	if (isLoading)
		return (
			<div className='h-dvh'>
				<span className='spinner'></span>
			</div>
		);

	return (
		<Container className=' mt-5 '>
			<GoBackNavigation />
			<h2 className=' mt-4 font-bold p-3 rounded-2xl text-xl bg-secondary text-primary'>
				{plan?.plan}
			</h2>
			<TasksList tasks={tasks} isTasking={isTasking} plan={plan} />
			<AddTask tasks={tasks} planId={planId} />
		</Container>
	);
}

export default TasksLayout;
