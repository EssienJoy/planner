import { IoEnter } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";

import Link from "./ui/Link";
import Button from "./ui/Button";

export const Auth = () => {
	const isAuthenticated = false;

	return (
		<div className=' items-center gap-2 hidden sm:flex'>
			{isAuthenticated ? (
				<Button className=' items-center gap-1 flex'>
					<HiOutlineLogout />
					<span>Logout </span>
				</Button>
			) : (
				<Link to='/signup' className='text-lg font-bold'>
					<p>Sign up</p>
					<IoEnter size='1.5rem' />
				</Link>
			)}
		</div>
	);
};
