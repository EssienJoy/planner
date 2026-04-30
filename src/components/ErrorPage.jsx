import { useNavigate, useRouteError } from "react-router-dom";
import Container from "./ui/Container";
import Button from "./ui/Button";

function ErrorPage() {
	const error = useRouteError();
	const navigate = useNavigate();

	return (
		<Container className='grid place-items-center gap-5 h-dvh'>
			<div className='bg-secondary p-5 rounded-2xl flex flex-col gap-2'>
				<h2 className='font-bold text-2xl text-center text-primary'>
					Something went wrong:
				</h2>
				<p className='text-sm text-red-500'>
					{error?.message || "Unknown error"}
				</p>

				<div className='flex gap-5 my-5  justify-between items-center'>
					<Button
						bg='bg-primary'
						text='text-secondary'
						onClick={() => navigate(-1)}>
						Go Back
					</Button>

					<Button
						bg='bg-primary'
						text='text-secondary'
						onClick={() => navigate("/")}>
						Go Home
					</Button>
				</div>
			</div>
		</Container>
	);
}

export default ErrorPage;
