import Container from "./ui/Container";
import { IoEnter } from "react-icons/io5";

import NavList from "./NavList";
import { MobileNav } from "./MobileNav";
import Image from "./ui/Image";
import { Link } from "react-router-dom";
import DottedMenu from "./DottedMenu";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";

function Header() {
	const { isAuthenticated, user } = useGetCurrentUser();
	console.log(user?.photo);

	return (
		<header className=''>
			<Container className='flex justify-between custom-shadow items-center px-4 py-6'>
				<Image src='/img/png/calendar-logo.avif' alt='calender logo' />
				<NavList />

				<div className=' items-center flex gap-2'>
					<MobileNav />
					<DottedMenu />
					{isAuthenticated ? (
						<div className='w-14 h-14 rounded-full overflow-hidden sunken-shadow'>
							<img
								src={`${
									import.meta.env.VITE_API_PLANNER_BACKEND_URL
								}/img/users/${user?.photo}`}
								alt='User profile'
								className='w-full h-full object-cover'
							/>
						</div>
					) : (
						<Link to='/signup' className='flex items-center gap-1 font-bold'>
							<p>Sign up</p>
							<IoEnter size='1.5rem' />
						</Link>
					)}
				</div>
			</Container>
		</header>
	);
}

export default Header;
