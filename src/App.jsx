import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "./Store/store";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import Signup from "./pages/Signup";
import Tasks from "./pages/Tasks";
import SettingsLayout from "./features/Settings/SettingsLayout";
import UserSettings from "./features/Settings/UserSettings";
import PlanSettings from "./features/Settings/PlanSettings";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import { TogglePlanProvider } from "./components/TogglePlanForm";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<ProtectedRoute>
				<AppLayout />
			</ProtectedRoute>
		),
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/plans/:planId", element: <Tasks /> },
			{
				path: "/settings",
				element: <SettingsLayout />,
				children: [
					{ path: "/settings/user", element: <UserSettings /> },
					{ path: "/settings/plans", element: <PlanSettings /> },
				],
			},
		],
	},
	{ path: "/login", element: <Login /> },
	{ path: "/signup", element: <Signup /> },
	{ path: "/reset-password", element: <ResetPassword /> },
	{ path: "*", element: <NotFoundPage /> },
]);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
			gcTime: 1000 * 60 * 5,
			refetchOnWindowFocus: false,
			retry: 1,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<Provider store={store}>
				<TogglePlanProvider>
					<RouterProvider router={router} />
				</TogglePlanProvider>
			</Provider>
			<Toaster
				position='top-center'
				gutter={12}
				containerStyle={{ margin: "8px" }}
				toastOptions={{
					success: {
						duration: 2000,
					},
					error: {
						duration: 3000,
					},
					style: {
						fontSize: "16px",
						maxWidth: "500px",
						padding: "16px 24px",
						backgroundColor: "var(--color-secondary)",
						color: "var(--color-primary)",
					},
				}}
			/>
		</QueryClientProvider>
	);
}

export default App;
