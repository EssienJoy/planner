import { settingsUrl } from "../../constants/data";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

function SideBar({ logout, isPending }) {
	return (
		<nav
			className='min-w-[200px] px-5 
						hidden sm:block'>
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
				bg='bg-primary'
				text='text-secondary'
				className='mt-5 font-bold text-lg w-full'>
				{isPending ? "logging..." : "Logout"}
			</Button>
		</nav>
	);
}

export default SideBar;
