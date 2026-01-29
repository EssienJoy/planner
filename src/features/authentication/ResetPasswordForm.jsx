import Button from "../../components/ui/Button";
import Container from "../../components/ui/Container";
import GoBackNavigation from "../../components/ui/GoBackNavigation";
import { useResetPassword } from "../../hooks/useResetPassword";

function ResetPasswordForm() {
	const { isPending, forgotPassword } = useResetPassword();

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData.entries());

		forgotPassword(data);
	};
	return (
		<Container className='grid place-items-center h-dvh'>
			<div className='shadow-[10px_10px_20px_#d4d3d3,-4px_-4px_20px_#ffffff] w-full sm:w-1/2 p-4 rounded-3xl'>
				<GoBackNavigation />

				<form className='rounded-lg h-70' onSubmit={handleSubmit}>
					<h3 className='text-center text-2xl sm:text-3xl font-bold my-3'>
						Forgot Password
					</h3>
					<div className='my-10 grid gap-3'>
						<label className='text-lg font-bold'>Email:</label>
						<input
							name='email'
							placeholder='Email'
							className=' block border-b-2 border-b-white rounded-2xl px-4 py-2 sunken-shadow'
							type='email'
							required
						/>
					</div>

					<Button className='mx-auto block' type='submit' disabled={isPending}>
						{isPending ? "checking details..." : "Reset"}
					</Button>
				</form>
			</div>
		</Container>
	);
}

export default ResetPasswordForm;
