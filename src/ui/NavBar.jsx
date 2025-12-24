import Nav from "./Nav";
import Image from "./Image";
import { IoEnter } from "react-icons/io5";
import { useAuth } from "../context/useAuth";
import HarmburgerMenu from "./HarmburgerMenu";
import MobileNav from "./MobileNav";
import { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";

import logo from "../../public/calendar-logo.avif";
import Container from "./Container";
import Button from "./Button";
import Link from "./Link";

function NavBar() {
	const { isAuthenticated, logout } = useAuth();

	const [toggleMenu, setIsToggleMenu] = useState(false);

	return (
		<header className=''>
			<Container className='flex justify-between custom-shadow items-center px-4 py-6'>
				<Image src={logo} alt='calender logo' />

				<Nav />

				<MobileNav toggleMenu={toggleMenu} setIsToggleMenu={setIsToggleMenu} />

				<div className='flex items-center gap-2'>
					<HarmburgerMenu
						setIsToggleMenu={setIsToggleMenu}
						toggleMenu={toggleMenu}
					/>

					{isAuthenticated ? (
						<Button
							className='hidden sm:flex items-center gap-1'
							onClick={logout}>
							<HiOutlineLogout />
							<span>Logout </span>
						</Button>
					) : (
						<Link to='/signup' className='text-lg font-bold'>
							<p>Sign up</p>
							<IoEnter size='1.5rem' />
						</Link>
					)}
				</div>
			</Container>
		</header>
	);
}

export default NavBar;
