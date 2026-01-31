import { Link, Outlet } from "react-router-dom";
import Container from "../../components/ui/Container";
import { useLogout } from "../../hooks/useLogout";
import HarmburgerMenu from "../../components/HarmburgerMenu";
import { useState } from "react";
import MobileSideBar from "./MobileSideBar";
import SideBar from "./SideBar";

function SettingsLayout() {
	const { logout, isPending } = useLogout();
	const [toggleMenu, setIsToggleMenu] = useState(false);

	return (
		<Container className='mt-5 '>
			<div className='flex flex-col sm:flex-row gap-5 bg-secondary text-primary rounded-2xl py-5 px-3 relative'>
				<HarmburgerMenu
					toggleMenu={toggleMenu}
					setIsToggleMenu={setIsToggleMenu}
				/>
				{toggleMenu && (
					<MobileSideBar
						setIsToggleMenu={setIsToggleMenu}
						logout={logout}
						isPending={isPending}
					/>
				)}
				<SideBar logout={logout} isPending={isPending} />
				<Outlet />
			</div>
		</Container>
	);
}

export default SettingsLayout;
