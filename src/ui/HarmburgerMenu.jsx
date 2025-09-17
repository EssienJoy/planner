import { CgMenuRightAlt } from "react-icons/cg";
import styled from "styled-components";

const Button = styled.button`
	display: none;
	@media (max-width: 850px) {
		display: flex;
	}
`;

function HarmburgerMenu({ setIsToggleMenu }) {
	function handleToggleMenu() {
		setIsToggleMenu((t) => !t);
	}

	return (
		<Button onClick={handleToggleMenu}>
			<CgMenuRightAlt size='2rem' />
		</Button>
	);
}

export default HarmburgerMenu;
