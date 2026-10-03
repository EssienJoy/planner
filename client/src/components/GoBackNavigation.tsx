import { useNavigate } from "react-router"
import { HiArrowLeft } from "react-icons/hi"

function GoBackNavigation({ className = "" }) {
	const navigate = useNavigate()

	return (
		<button onClick={() => navigate(-1)}>
			<HiArrowLeft className={`${className}`} />
		</button>
	)
}

export default GoBackNavigation
