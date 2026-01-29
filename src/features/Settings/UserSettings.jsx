import { useState } from "react";
import UserPasswordForm from "./UserPasswordForm";
import UserProfileForm from "./UserProfileForm";
import Button from "../../components/ui/Button";

function UserSettings() {
	const [show, setShow] = useState(false);
	return (
		<div className='flex-1 sm:pr-8'>
			<h1 className='text-lg  sm:text-2xl font-bold mb-5'>
				Your Account Settings
			</h1>
			<UserProfileForm />

			<div className='mt-6 sm:mt-12  rounded-3xl'>
				<div className='flex justify-between items-center'>
					<h2 className='text-lg sm:text-xl font-bold mb-5'>Change Password</h2>
					<Button
						onClick={() => setShow((s) => !s)}
						bg='bg-primary'
						text='text-secondary'>
						{show ? "Close" : "Open"}
					</Button>
				</div>
				{show && <UserPasswordForm />}
			</div>
		</div>
	);
}

export default UserSettings;
