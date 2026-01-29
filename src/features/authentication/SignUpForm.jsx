import Button from "../../components/ui/Button";
import GoBackNavigation from "../../components/ui/GoBackNavigation";
import { useSignUp } from "../../hooks/useSignUp";

function SignUpForm() {
	const { signUp, isPending } = useSignUp();

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData.entries());

		signUp(data);
	};

	return (
		<section className='grid place-items-center h-dvh '>
			<div className='bg-secondary text-primary w-full sm:w-1/2 px-4 py-8 rounded-3xl'>
				<GoBackNavigation />

				<form
					className='rounded-lg flex flex-col gap-5'
					onSubmit={handleSubmit}>
					<h3 className='text-center text-2xl sm:text-3xl font-bold'>
						Sign up
					</h3>

					<input
						name='fullName'
						placeholder='Full Name'
						className=' block border-b-2 border-b-white rounded-2xl px-4 py-2 sunken-shadow'
						type='text'
						required
					/>

					<input
						name='email'
						placeholder='Email'
						className=' block border-b-2 border-b-white rounded-2xl px-4 py-2 sunken-shadow'
						type='email'
						required
					/>
					<input
						name='password'
						placeholder='Password'
						className=' block border-b-2 border-b-white rounded-2xl px-4 py-2 sunken-shadow'
						type='password'
						required
					/>

					<input
						name='confirmPassword'
						placeholder='Confirm Password'
						className=' block border-b-2 border-b-white rounded-2xl px-4 py-2 sunken-shadow'
						type='password'
						required
					/>

					<Button
						bg='bg-primary'
						text='text-secondary'
						className='self-center'
						type='submit'
						disabled={isPending}>
						{isPending ? "Signing up..." : "Sign Up"}
					</Button>
				</form>
			</div>
		</section>
	);
}

export default SignUpForm;
