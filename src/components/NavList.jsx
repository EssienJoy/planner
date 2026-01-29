import { Link } from "react-router-dom";
import { url } from "../constants/data";

function NavList() {
	return (
		<nav className='sm:flex items-center gap-3 hidden '>
			<ul className='flex gap-8 items-center'>
				{url.map((link) => {
					const Icon = link.icon;

					return (
						<li key={link.href}>
							<Link
								className='flex items-center gap-2 text-lg font-bold'
								// style={
								// 	link.href === "/login" && isAuthenticated
								// 		? { display: "none" }
								// 		: {}
								// }
								to={link.href}>
								<Icon />
								<span>{link.text}</span>
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

export default NavList;
