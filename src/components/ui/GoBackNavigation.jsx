import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import Button from "./Button";

function GoBackNavigation() {
	const navigate = useNavigate();

	return (
		<Button onClick={() => navigate(-1)}>
			<HiArrowLeft />
		</Button>
	);
}

export default GoBackNavigation;
