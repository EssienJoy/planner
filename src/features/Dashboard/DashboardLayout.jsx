import DashboardEvents from "./DashboardEvents";
import Calendar from "../../ui/Calendar";
import Footer from "../../ui/Footer";
import Container from "../../ui/Container";

function DashboardLayout() {
	return (
		<>
			<Container className='my-5 flex flex-col  md:flex-row gap-5'>
				<DashboardEvents />

				<Calendar className='grow'>
					<div className='flex flex-wrap gap-1 justify-between items-center my-5 '>
						<Calendar.Months />

						<div className='flex items-center gap-4 p-3'>
							<Calendar.NavLeft />
							<Calendar.Year />
							<Calendar.NavRight />
						</div>
					</div>
					<Calendar.Grid />
				</Calendar>
			</Container>
			<Footer />
		</>
	);
}

export default DashboardLayout;
