import { useRef } from "react";
import { useUpdateCurrentUserPassword } from "../../hooks/useUpdateCurrentUserPassword";
import Button from "../../components/ui/Button";

function UserPasswordForm() {
	const formRef = useRef(null);
	const { isPending, updateCurrentUserPassword } =
		useUpdateCurrentUserPassword();

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData.entries());
		updateCurrentUserPassword(data, {
			onSuccess: () => {
				formRef.current?.reset();
			},
		});
	};

	return (
		<form
			ref={formRef}
			className='flex flex-col gap-5 max-w-md text-sm'
			onSubmit={handleSubmit}>
			<div className='grid gap-2'>
				<label className='font-bold text-md'>Current Password</label>
				<input
					type='password'
					name='currentPassword'
					required
					className='border-b-2 border-b-white rounded-2xl px-4 py-2 sunken-shadow'
					placeholder='********'
				/>
			</div>

			<div className='grid gap-2'>
				<label className='font-bold'>New Password</label>
				<input
					type='password'
					name='password'
					required
					className='border-b-2 border-b-white rounded-2xl px-4 py-2 sunken-shadow'
					placeholder='********'
				/>
			</div>

			<div className='grid gap-2'>
				<label className='font-bold'>Confirm New Password</label>
				<input
					type='password'
					name='confirmPassword'
					required
					className='border-b-2 border-b-white rounded-2xl px-4 py-2 sunken-shadow'
					placeholder='********'
				/>
			</div>

			<Button
				type='submit'
				className='self-start px-6 py-3 rounded-2xl font-bold'
				bg='bg-primary'
				text='text-secondary'
				disabled={isPending}>
				{isPending ? "updating..." : "Update Password"}
			</Button>
		</form>
	);
}

export default UserPasswordForm;
