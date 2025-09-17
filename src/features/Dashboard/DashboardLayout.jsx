import DashboardEvents from "./DashboardEvents";
import Row from "../../ui/Row";
import Calendar from "../../ui/Calendar";
import BoxShadow from "../../ui/BoxShadow";
import Footer from "../../ui/Footer";

function DashboardLayout() {
	return (
		<>
			<Row type='horizontal'>
				<DashboardEvents />

				<Calendar>
					<BoxShadow>
						<Row type='vertical'>
							<div
								style={{
									display: "flex",
									flexWrap: "wrap",
									alignItems: "center",
									justifyContent: "space-between",
									gap: "1rem",
									padding: "1rem",
								}}>
								<Calendar.Months />

								<div
									style={{
										display: "flex",
										alignItems: "center",
										gap: "1rem",
									}}>
									<Calendar.NavLeft />
									<Calendar.Year />
									<Calendar.NavRight />
								</div>
							</div>
							<Calendar.Grid />
						</Row>
					</BoxShadow>
				</Calendar>
			</Row>
			<Footer />
		</>
	);
}

export default DashboardLayout;
