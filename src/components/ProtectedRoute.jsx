import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";

function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	const { isAuthenticated, isLoading } = useGetCurrentUser();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			navigate("/login", { replace: true });
		}
	}, [isLoading, isAuthenticated, navigate]);

	if (isLoading) return <p>Loading...</p>;

	return children;
}

export default ProtectedRoute;
