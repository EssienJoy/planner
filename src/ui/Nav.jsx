import styled from "styled-components";
import { HiOutlineHome, HiCalendarDays } from "react-icons/hi2";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "../context/useAuth";
import StyledLists from "./StyledLists";
import Button from "./Button";

const StyledUl = styled.nav`
	display: flex;
	gap: 2rem;
	list-style: none;
	font-size: 1.2rem;
	font-weight: 500;

	@media (max-width: 850px) {
		display: none;
	}

	button {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
`;

function Nav() {
	const { isAuthenticated, logout } = useAuth();

	return (
		<StyledUl>
			<StyledLists to='/'>
				<HiOutlineHome />
				<span>Home</span>
			</StyledLists>

			<StyledLists to='/plans'>
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

export default Nav;
