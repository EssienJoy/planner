import { useNavigate } from "react-router";
import { HiArrowLeft } from "react-icons/hi";
import Button from "./AppButton.jsx";

function GoBackNavigation({ className = "" }) {
	const navigate = useNavigate();

	return (
		<Button onClick={() => navigate(-1)}>
			<HiArrowLeft className={`${className}`} />
		</Button>
	);
}

export default GoBackNavigation;
