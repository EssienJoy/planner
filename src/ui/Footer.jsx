import { Link } from "react-router-dom";
import Container from "./Container";

function Footer() {
	return (
		<Container className='custom-shadow flex justify-between gap-5 items-center px-4 py-6 flex-wrap'>
			<div className=''>
				<h4 className='font-bold'>Planner — cc@planner</h4>
				<p>Plan smarter.</p>
			</div>

			<div className='flex flex-row gap-3'>
				<Link to='#'>Contact</Link>
				<Link to='#'>Settings</Link>
				<Link to='#'>Help</Link>
			</div>

			<div className='small'>© {new Date().getFullYear()} Planner</div>
		</Container>
	);
}

export default Footer;
