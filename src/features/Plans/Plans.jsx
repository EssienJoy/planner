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
import Container from "../../ui/Container";

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
				onSuccess: () => {
					setCreatePlan("");
					setDate("");
				},
			}
		);
	}

	return isAuthenticated ? (
		<Container className=' mt-5 flex flex-col lg:flex-row gap-5 '>
			<div className='custom-shadow h-dvh rounded-2xl sm:rounded-4xl p-4  lg:w-1/2'>
				{!plans ? (
					<p className='text-lg font-bold'>
						Tracked plans is empty,create a new plan.{" "}
					</p>
				) : isLoading ? (
					<div className='spinner'></div>
				) : (
					<>
						<h2 className='text-xl font-bold'>
							{user?.name} has {plans?.length} tracked plans
						</h2>
						<PlansList plans={plans} />
					</>
				)}
			</div>

			<div className='flex flex-col gap-5 lg:w-1/2'>
				<form
					onSubmit={handleSubmit}
					className='custom-shadow rounded-2xl sm:rounded-4xl p-4 sm:p-10 flex flex-col gap-7'>
					<label
						htmlFor='plans'
						className='text-md sm:text-lg font-bold text-[#676767]'>
						Create a plan
					</label>
					<div className='flex flex-col sm:flex-row  gap-5 sm:items-center'>
						<textArea
							className='bg-white p-4 grow rounded-2xl h-20 text-sm sm:text-lg'
							name='plans'
							id='plans'
							placeholder='Write your plan here...'
							value={plan}
							required
							onChange={(e) => setCreatePlan(e.target.value)}
						/>
						<Button
							type='submit'
							disabled={isCreating}
							className='flex items-center self-start sm:self-center gap-2 text-sm'>
							<HiCheck />
							{isCreating ? "creating..." : "Add"}
						</Button>
					</div>

					<div className='flex flex-col gap-2'>
						<label
							className='text-md sm:text-lgfont-bold text-[#676767]'
							htmlFor='date'>
							Select a date
						</label>
						<input
							className='bg-white p-4 rounded-2xl text-sm sm:text-lg'
							type='date'
							id='date'
							value={date}
							onChange={(e) => setDate(e.target.value)}
							required
						/>
					</div>
				</form>

				<Calendar>
					<Calendar.Grid />
				</Calendar>
			</div>
		</Container>
	) : (
		<p style={{ padding: "1rem" }}>
			You have no plans, login to{" "}
			<Link className='underline' to='/login'>
				get started
			</Link>
		</p>
	);
}

export default Plans;
