import { format } from "date-fns";
import { useSelector } from "react-redux";

import Image from "../../ui/Image";
import Clock from "../../ui/Clock";
import { usePlans } from "../../hooks/usePlans";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function DashboardEvents() {
	const { plans, isLoading } = usePlans();
	const { isAuthenticated } = useAuth();

	const currentDate = useSelector((store) => store.date.currentDate);

	return (
		<section className='flex flex-col gap-3 grow'>
			<div className='flex items-center  gap-4'>
				<Clock />

				<div className='custom-shadow rounded-2xl p-4'>
					<Image src='notification.jpg' alt='Notificatio Icon' />
					<p>{format(currentDate, "p")}</p>
					<p>{format(currentDate, " MMM d, yy")}</p>
				</div>
			</div>

			<div className='custom-shadow h-48 rounded-4xl p-4'>
				<h2 className='text-xl font-bold'>Tracked Plans</h2>
				{isAuthenticated ? (
					plans?.length ? (
						<ul>
							{isLoading ? (
								<div className='spinner'></div>
							) : (
								plans?.slice(0, 2).map((plan) => (
									<li
										className='sunken-shadow py-2 px-4 rounded-2xl font-bold my-3 '
										key={plan.id}>
										{plan.title}
									</li>
								))
							)}
						</ul>
					) : (
						<p>
							Your tracked plans are empty, create a plan{" "}
							<Link to='/plans' className='underline'>
								now
							</Link>
						</p>
					)
				) : (
					<p>
						Create a plan, Track plans, Complete goals,{" "}
						<Link className='underline' to='/login'>
							Get Started
						</Link>
					</p>
				)}
			</div>
		</section>
	);
}

export default DashboardEvents;
