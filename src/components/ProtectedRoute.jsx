import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import Container from "./ui/Container";

function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	const { isAuthenticated, isLoading } = useGetCurrentUser();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			navigate("/login", { replace: true });
		}
	}, [isLoading, isAuthenticated, navigate]);

	if (isLoading)
		return (
			<Container className='grid place-items-center h-dvh '>
				Loading...
			</Container>
		);

	return children;
}

export default ProtectedRoute;
