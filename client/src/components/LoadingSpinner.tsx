import { LoaderCircle } from "lucide-react"

function LoadingSpinner({ label = "Loading..." }: { label?: string }) {
	return (
		<div
			role="status"
			aria-label={label}
			className="grid min-h-48 place-items-center">
			<LoaderCircle
				aria-hidden="true"
				className="size-8 animate-spin text-primary"
			/>
		</div>
	)
}

export default LoadingSpinner
