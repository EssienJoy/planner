import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";

function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	// 1 . Load the authenticated user
	const { isLoading, isAuthenticated } = useGetCurrentUser();
	// console.log(isLoading, isAuthenticated);

	// 3. If there is no authenticated user,redirect tologin page
	useEffect(
		function () {
			if (!isAuthenticated && !isLoading) navigate("/login");
		},
		[isAuthenticated, isLoading, navigate]
	);

	// 2.While Loading show a spinner
	if (isLoading)
		return (
			<div className='h-dvh flex items-center'>
				<div className='spinner'></div>
			</div>
		);

	// 4. If there is a user render the app
	if (isAuthenticated) return children;
	return children;
}

export default ProtectedRoute;
