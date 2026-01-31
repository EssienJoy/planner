import Button from "./components/ui/Button";
import Container from "./components/ui/Container";

function ErrorFallback({ error, resetErrorBoundary }) {
	return (
		<Container className='bg-secondary text-primary'>
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<Button
				bg='bg-primary'
				text='text-secondary'
				onClick={resetErrorBoundary}>
				Try again
			</Button>
		</Container>
	);
}

export default ErrorFallback;
