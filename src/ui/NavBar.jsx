import styled from "styled-components";

import Nav from "./Nav";
import Image from "./Image";
import SunkenLayout from "./SunkenLayout";
import StyledLists from "./StyledLists";
import { IoEnter } from "react-icons/io5";
import { useAuth } from "../context/useAuth";
import { useUser } from "../hooks/useUser";
import HarmburgerMenu from "./HarmburgerMenu";
import MobileNav from "./MobileNav";
import { useState } from "react";

import logo from "../../public/calendar-logo.avif";

const StyledNavBar = styled.header`
	padding: 2rem 1rem;
	box-shadow: 5px 5px 14px #c8c8c8, -5px -5px 14px #ffffff;
	border-radius: 5rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: 500;
	margin-bottom: 2rem;

	@media (max-width: 550px) {
		padding: 1rem;
		margin-bottom: 1rem;
	}
`;

function NavBar() {
	const { isAuthenticated } = useAuth();
	const { user } = useUser();

	const [toggleMenu, setIsToggleMenu] = useState(false);

	return (
		<StyledNavBar>
			<Image src={logo} alt='calender logo' />

			<Nav />

			<MobileNav toggleMenu={toggleMenu} setIsToggleMenu={setIsToggleMenu} />

			<div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
				<HarmburgerMenu
					setIsToggleMenu={setIsToggleMenu}
					toggleMenu={toggleMenu}
				/>

				{isAuthenticated ? (
					<div style={{ display: "flex", gap: "1rem" }}>
						<SunkenLayout as='p'>Hi, {user?.name}</SunkenLayout>
						<Image src='/default-user.jpg' alt='User avatar' />
					</div>
				) : (
					<StyledLists to='/signup'>
						<p>Sign up</p>
						<IoEnter size='1.5rem' />
					</StyledLists>
				)}
			</div>
		</StyledNavBar>
	);
}

export default NavBar;
