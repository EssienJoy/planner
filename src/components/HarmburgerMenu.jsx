import { CgMenuRightAlt } from "react-icons/cg";

function HarmburgerMenu({ setIsToggleMenu, toggleMenu }) {
	function handleToggleMenu() {
		setIsToggleMenu(!toggleMenu);
	}

	return (
		<button className='flex sm:hidden' onClick={handleToggleMenu}>
			<CgMenuRightAlt size='2rem' />
		</button>
	);
}

export default HarmburgerMenu;
