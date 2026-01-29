import { RiCloseLine } from "react-icons/ri";
import { HiOutlineHome, HiCalendarDays } from "react-icons/hi2";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router-dom";

const mobileLink = [
	{
		url: "/",
		text: "Home",
		icon: <HiOutlineHome />,
	},
	{
		url: "/plans",
		text: "Plans",
		icon: <HiCalendarDays />,
	},
];

function MobileNavlist({ toggleMenu, setIsToggleMenu }) {
	return (
		<nav
			className='sm:hidden fixed top-0 right-0 z-50 sunken-shadow w-[70%] px-3 py-6 rounded-tl-3xl rounded-bl-3xl'
			style={{
				transform: toggleMenu ? "translateX(0)" : "translateX(100%)",
				transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
			}}>
			<button onClick={() => setIsToggleMenu(false)}>
				<RiCloseLine size='2rem' />
			</button>
			<ul className='flex flex-col gap-3'>
				{mobileLink.map((link, index) => {
					const Icon = link.icon;

					return (
						<li key={index}>
							<Link className='flex items-center gap-3' to={link.url}>
								{Icon}
								<span>{link.text}</span>
							</Link>
						</li>
					);
				})}
				<li>
					<Link className='flex items-center gap-3' to='/login'>
						<HiOutlineLogin />
						<span>Login</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default MobileNavlist;
