import { Outlet } from "react-router-dom";
import MobileNavigation from "./MobileNavigation";
// import Header from "./Header";

function AppLayout() {
	return (
		<>
			{/* <Header /> */}
			<main>
				<Outlet />
			</main>
			<MobileNavigation />
		</>
	);
}

export default AppLayout;
