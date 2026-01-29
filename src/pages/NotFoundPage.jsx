import { Link } from "react-router-dom";
import Container from "../components/ui/Container";

function NotFoundPage() {
	return (
		<Container className='grid place-items-center text-text-black h-dvh '>
			<div className='flex flex-col gap-3 items-center custom-shadow p-4 rounded-3xl'>
				<p className='text-sm sm:text-2xl font-bold uppercase'>
					This Page does not exist
				</p>
				<Link
					className='custom-button-shadow py-2 px-4 rounded-2xl font-bold'
					to='/'>
					Home
				</Link>
			</div>
		</Container>
	);
}

export default NotFoundPage;
