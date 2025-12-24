import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import store from "./Store/store";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import Form from "./pages/Form";
import Goals from "./pages/Goals";
import Signup from "./pages/Signup";
import SuccessfulSignup from "./pages/SuccessfulSignup";
import { AuthProvider } from "./context/FakeAuthContext";
import PlansPage from "./pages/PlansPage";

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/plans", element: <PlansPage /> },
			{ path: "/plans/:planId", element: <Goals /> },
			{ path: "/form", element: <Form /> },
		],
	},
	{ path: "/login", element: <LoginPage /> },
	{ path: "/signup", element: <Signup /> },
	{ path: "/created", element: <SuccessfulSignup /> },
	{ path: "*", element: <NotFoundPage /> },
]);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
			cacheTime: 1000 * 60 * 5,
			refetchOnWindowFocus: false,
			retry: 1,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<AuthProvider>
				<Provider store={store}>
					<RouterProvider router={router} />
				</Provider>
			</AuthProvider>
			<Toaster
				position='top-center'
				gutter={12}
				containerStyle={{ margin: "8px" }}
				toastOptions={{
					success: {
						duration: 3000,
					},
					error: {
						duration: 7000,
					},
					style: {
						fontSize: "16px",
						maxWidth: "500px",
						padding: "16px 24px",
						backgroundColor: "var(--primary-color)",
						color: "var(--text-black)",
						boxShadow:
							"inset -5px -5px 14px #ffffff, inset 5px 5px 14px #a8a8a8",
					},
				}}
			/>
		</QueryClientProvider>
	);
}

export default App;
