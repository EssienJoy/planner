// import styled from "styled-components";
import { format } from "date-fns";
import { useSelector } from "react-redux";

import Image from "../../ui/Image";
import Clock from "../../ui/Clock";
import BoxShadow from "../../ui/BoxShadow";
import Row from "../../ui/Row";
import SunkenLayout from "../../ui/SunkenLayout";
import { usePlans } from "../../hooks/usePlans";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function DashboardEvents() {
	const { plans, isLoading } = usePlans();
	const { isAuthenticated } = useAuth();

	const currentDate = useSelector((store) => store.date.currentDate);

	return (
		<BoxShadow style={{ flexGrow: "1" }}>
			<Row type='vertical'>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyItems: "center",
						gap: "1rem",
					}}>
					<Clock />

					<BoxShadow style={{ padding: "1rem" }}>
						<Image src='notification.jpg' alt='Notificatio Icon' />
						<p>{format(currentDate, "p")}</p>
						<p>{format(currentDate, "EEE, MMM d, yy")}</p>
					</BoxShadow>
				</div>

				<BoxShadow style={{ height: "12rem" }}>
					<h2>Tracked Plans</h2>
					{isAuthenticated ? (
						plans?.length ? (
							<ul>
								{isLoading ? (
									<div className='spinner'></div>
								) : (
									plans?.slice(0, 2).map((plan) => (
										<SunkenLayout as='li' key={plan.id}>
											{plan.title}
										</SunkenLayout>
									))
								)}
							</ul>
						) : (
							<p>
								Your tracked plans are empty, create a plan{" "}
								<Link to='/plansPage' className='underline'>
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
				</BoxShadow>
			</Row>
		</BoxShadow>
	);
}

export default DashboardEvents;
