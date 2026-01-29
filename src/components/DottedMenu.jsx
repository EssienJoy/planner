import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

const mobileLink = [
	{
		url: "/settings/user",
		text: "Settings",
	},
	{
		url: "#",
		text: "Contact",
	},
];
function DottedMenu() {
	const [show, setShow] = useState(false);
	return (
		<div className='hidden sm:block'>
			<button onClick={() => setShow((s) => !s)} className='relative p-1 '>
				<BsThreeDotsVertical size='2rem' />
			</button>
			{show && (
				<nav className='absolute top-25 right-25 z-50 sunken-shadow  p-6 rounded-2xl '>
					<ul className='flex flex-col gap-3'>
						{mobileLink.map((link) => {
							return (
								<li key={link.text}>
									<Link
										className='flex items-center gap-3 font-bold text-lg'
										to={link.url}>
										<span>{link.text}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			)}
		</div>
	);
}

export default DottedMenu;
