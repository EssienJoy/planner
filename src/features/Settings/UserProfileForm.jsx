import { useGetCurrentUser } from "../../hooks/useGetCurrentUser";
import { MdOutlineFileUpload } from "react-icons/md";
import { useUpdateCurrentUser } from "../../hooks/useUpdateCurrentUser";
import Button from "../../components/ui/Button";

function UserProfileForm() {
	const { updateCurrentUser, isPending } = useUpdateCurrentUser();
	const { user } = useGetCurrentUser();

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();

		formData.append("fullName", e.target.fullName.value);
		formData.append("email", e.target.email.value);
		if (e.target.photo.files[0]) {
			formData.append("photo", e.target.photo.files[0]);
		}
		updateCurrentUser(formData);
	};
	return (
		<form className='flex flex-col gap-5 rounded-3xl' onSubmit={handleSubmit}>
			<div className='grid gap-2'>
				<label htmlFor='fullName' className='font-bold'>
					Full Name
				</label>
				<input
					name='fullName'
					className=' block border-b-2 border-b-white rounded-2xl px-4 py-2 sunken-shadow'
					type='text'
					defaultValue={user?.fullName}
				/>
			</div>

			<div className='grid gap-2'>
				<label htmlFor='email' className='font-bold'>
					Email
				</label>
				<input
					name='email'
					className=' block border-b-2 border-b-white rounded-2xl px-4 py-2 sunken-shadow'
					type='text'
					defaultValue={user?.email}
				/>
			</div>

			{/* Profile Image Section */}
			<div className='flex items-center gap-6 mb-8'>
				<div className='w-12 h-12 sm:w-24 sm:h-24 rounded-full overflow-hidden sunken-shadow'>
					<img
						src={`/img/png/default.jpg`}
						alt='User profile'
						className='w-full h-full object-cover'
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label className='font-bold'>Change Profile Photo</label>

					<input
						className='hidden'
						type='file'
						accept='image/*'
						id='photo'
						name='photo'
					/>

					<label
						htmlFor='photo'
						className='px-4  py-2 rounded-xl 
						bg-secondary text-primary text-sm
						 flex items-center gap-2 cursor-pointer'>
						<span>Choose file</span> <MdOutlineFileUpload />
					</label>
				</div>
			</div>

			<Button
				type='submit'
				className='self-start mt-4 px-6 py-3 rounded-2xl font-bold custom-button-shadow'
				disabled={isPending}
				bg='bg-primary'
				text='text-secondary'>
				{isPending ? "updating..." : "Update User"}
			</Button>
		</form>
	);
}

export default UserProfileForm;
