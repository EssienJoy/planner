import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Image from "../../components/ui/Image";
import { useLogin } from "../../hooks/useLogin";

function LoginForm() {
	const { login, isPending: loading } = useLogin();

	return (
		<section className='grid place-items-center h-dvh'>
			<div className='w-full bg-secondary text-primary sm:w-1/2 mx-auto grid place-items-center gap-12 rounded-3xl custom-shadow px-3 py-6'>
				<Image
					src='/img/png/calendar-logo.avif'
					alt='logo'
					className='justify-self-center'
				/>
				<form
					className='rounded-lg flex flex-col gap-8'
					onSubmit={async (e) => {
						e.preventDefault();
						const formData = new FormData(e.target);
						const data = Object.fromEntries(formData.entries());
						login(data);
					}}>
					<input
						className=' block border-b-2 border-b-white rounded-2xl px-4 py-2 sunken-shadow'
						type='email'
						name='email'
						placeholder='email'
						required
					/>
					<input
						className=' block border-b-2 border-b-white rounded-2xl px-4 py-2 sunken-shadow '
						type='password'
						name='password'
						placeholder='password'
						required
					/>

					<Button
						type='submit'
						className='self-center '
						bg='bg-primary'
						text='text-secondary'
						disabled={loading}>
						{loading ? "Logging..." : "Log in"}
					</Button>
				</form>
				<div>
					<Link className='underline' to='/reset-password'>
						forgot password{" "}
					</Link>
					or{" "}
					<Link className='underline' to='/signup'>
						sign up
					</Link>
				</div>
			</div>
		</section>
	);
}

export default LoginForm;
