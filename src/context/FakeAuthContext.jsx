import { useReducer, createContext, useEffect } from "react";
import { getUserId } from "../services/requests";
import toast from "react-hot-toast";

const AuthContext = createContext();

const initialState = {
	isAuthenticated: false,
	loading: false,
};

function reducer(state, action) {
	switch (action.type) {
		case "loading":
			return { ...state, loading: true };
		case "stopLoading":
			return { ...state, loading: false };
		case "login":
			return { ...state, isAuthenticated: true, loading: false };
		case "logout":
			return { ...state, isAuthenticated: false, loading: false };
		default:
			throw new Error("Unknown Action");
	}
}

export function AuthProvider({ children }) {
	const [{ isAuthenticated, loading }, dispatch] = useReducer(
		reducer,
		initialState
	);

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		if (userId) {
			dispatch({ type: "login" });
		}
	}, []);

	async function login(email, password) {
		try {
			dispatch({ type: "loading" });
			const user = await getUserId(email);

			if (user.password !== password) {
				toast.error("Incorrect password");
				dispatch({ type: "logout" });
				return;
			}

			localStorage.setItem("userId", user.id);
			dispatch({ type: "login" });

			toast.success(`Welcome back, ${user.name || "user"}!`);
			window.location.href = "/";
		} catch (err) {
			toast.error(err.message || "Login failed");
		} finally {
			dispatch({ type: "stopLoading" });
		}
	}

	function logout() {
		localStorage.removeItem("userId");
		dispatch({ type: "logout" });
		window.location.reload();
		window.location.href = "https://planner-six-chi.vercel.app/login";
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContext };
