import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";

function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	const { isLoading, isAuthenticated } = useGetCurrentUser();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			navigate("/login", { replace: true });
		}
	}, [isAuthenticated, isLoading, navigate]);

	if (isLoading) {
		return (
			<div className='h-dvh flex items-center justify-center'>
				<div className='spinner' />
			</div>
		);
	}

	if (!isAuthenticated) return null;

	return children;
}

export default ProtectedRoute;
