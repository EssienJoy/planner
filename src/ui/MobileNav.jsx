import styled from "styled-components";
import { HiOutlineHome, HiCalendarDays } from "react-icons/hi2";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "../context/useAuth";
import StyledLists from "./StyledLists";
import Button from "./Button";

const StyledUl = styled.nav`
	background-color: var(--color-primary);
	box-shadow: inset -5px -5px 14px #ffffff, inset 5px 5px 14px #a8a8a8;
	border-radius: 1rem;
	display: none;
	flex-direction: column;
	padding: 1rem;
	gap: 1rem;
	list-style: none;
	font-size: 1rem;
	font-weight: 500;
	position: fixed;
	top: 0;
	right: 0;
	z-index: 1000;

	@media (max-width: 850px) {
		display: flex;
	}

	button {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
`;

function MobileNav({ toggleMenu }) {
	const { isAuthenticated, logout } = useAuth();

	return (
		<StyledUl
			style={{
				transform: toggleMenu ? "translateX(0)" : "translateX(100%)",
				transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
			}}>
			<StyledLists to='/'>
				<HiOutlineHome />
				<span>Home</span>
			</StyledLists>

			<StyledLists to='/plansPage'>
				<HiCalendarDays />
				<span>Plans</span>
			</StyledLists>
			{isAuthenticated ? (
				<Button onClick={logout}>
					<HiOutlineLogout />
					<span>Logout </span>
				</Button>
			) : (
				<StyledLists to='/login'>
					<HiOutlineLogin />
					<span>login</span>
				</StyledLists>
			)}
		</StyledUl>
	);
}

export default MobileNav;
