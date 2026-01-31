import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { settingsUrl } from "../../constants/data";

function MobileSideBar({ logout, isPending, setIsToggleMenu }) {
	return (
		<nav
			className='min-w-[200px] px-5 
                              bg-primary rounded-tl-2xl h-full rounded-bl-2xl text-secondary
                              py-3 sm:hidden absolute top-0 left-0'>
			<button
				className='text-xl mb-3 sm:hidden'
				onClick={() => {
					setIsToggleMenu(false);
				}}>
				✖
			</button>
			<ul className='flex flex-col gap-7 '>
				{settingsUrl.map((s) => {
					const Icon = s.icon;

					return (
						<li key={s.text} className='font-bold text-lg'>
							<Link className='flex gap-3 items-center ' to={s.url}>
								<Icon className='text-xl' />
								<span className='uppercase'>{s.text}</span>
							</Link>
						</li>
					);
				})}
			</ul>
			<Button
				onClick={logout}
				disabled={isPending}
				className='mt-5 font-bold text-lg w-full'>
				{isPending ? "logging..." : "Logout"}
			</Button>
		</nav>
	);
}

export default MobileSideBar;
