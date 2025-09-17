import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import LayoutContainer from "./LayoutContainer";

function AppLayout() {
	return (
		<LayoutContainer>
			<NavBar />
			<main>
				<Outlet />
			</main>
		</LayoutContainer>
	);
}

export default AppLayout;
