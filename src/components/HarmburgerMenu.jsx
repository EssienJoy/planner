import { CgMenuRightAlt } from "react-icons/cg";

function HarmburgerMenu({ setIsToggleMenu, className = "" }) {
	return (
		<button
			className={`flex sm:hidden ${className}`}
			onClick={() => setIsToggleMenu(true)}>
			<CgMenuRightAlt size='2rem' />
		</button>
	);
}

export default HarmburgerMenu;
