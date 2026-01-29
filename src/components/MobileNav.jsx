import { useState } from "react";

import HarmburgerMenu from "./HarmburgerMenu";
import MobileNavlist from "./MobileNavList";

export const MobileNav = () => {
	const [toggleMenu, setIsToggleMenu] = useState(false);

	return (
		<>
			<MobileNavlist
				toggleMenu={toggleMenu}
				setIsToggleMenu={setIsToggleMenu}
			/>

			<HarmburgerMenu
				setIsToggleMenu={setIsToggleMenu}
				toggleMenu={toggleMenu}
			/>
		</>
	);
};
