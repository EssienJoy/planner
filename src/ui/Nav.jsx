import { HiOutlineHome, HiCalendarDays } from "react-icons/hi2";
import { HiOutlineLogin } from "react-icons/hi";
import { Link } from "react-router-dom";

const url = [
	{
		icon: HiOutlineHome,
		text: "Home",
		href: "/",
	},
	{
		icon: HiCalendarDays,
		text: "Plans",
		href: "/plans",
	},
	{
		icon: HiOutlineLogin,
		text: "login",
		href: "/login",
	},
];

function Nav() {
	return (
		<nav className='sm:flex items-center gap-3 hidden '>
			<ul className='flex gap-8 items-center'>
				{url.map((link) => {
					const Icon = link.icon;

					return (
						<li key={link.href}>
							<Link
								className='flex items-center gap-2 text-lg font-bold'
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

export default Nav;
