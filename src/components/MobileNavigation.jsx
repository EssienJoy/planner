import { GoHome } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Container from "./ui/Container";
import { IoAdd } from "react-icons/io5";
import { useTogglePlan } from "./TogglePlanForm";

const navList = [
	{
		link: "/",
		icon: GoHome,
	},
	{
		type: "button",
		icon: IoAdd,
	},
	{
		link: "/settings/user",
		icon: IoSettingsOutline,
	},
];

function MobileNavigation() {
	const { toggleShowForm } = useTogglePlan();
	return (
		<footer className='sm:mt-25 mt-10 '>
			<Container
				className=' relative 
		'>
				<nav
					className='absolute top-0 left-0 bg-secondary
				w-full py-3  rounded-tl-3xl rounded-tr-3xl'>
					<ul
						className='flex justify-center gap-10 
					item-center text-primary'>
						{navList.map((nav, index) => {
							const Icon = nav.icon;

							return (
								<li key={nav.link ?? index}>
									{nav.type === "button" ? (
										<button
											className='bg-primary
											 text-secondary p-2 rounded-full'
											onClick={toggleShowForm}>
											<Icon size='2rem' />
										</button>
									) : (
										<Link to={nav.link}>
											<Icon size='2rem' />
										</Link>
									)}
								</li>
							);
						})}
					</ul>
				</nav>
			</Container>
		</footer>
	);
}

export default MobileNavigation;
