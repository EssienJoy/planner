import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";

import store from "./Store/store";
import { TogglePlanProvider } from "./components/TogglePlanForm";

import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Container from "./components/ui/Container";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const Tasks = lazy(() => import("./pages/Tasks"));
const Notifications = lazy(() => import("./pages/Notifications"));
const SettingsLayout = lazy(() => import("./features/Settings/SettingsLayout"));
const UserSettings = lazy(() => import("./features/Settings/UserSettings"));
const PlanSettings = lazy(() => import("./features/Settings/PlanSettings"));

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<ProtectedRoute>
				<AppLayout />
			</ProtectedRoute>
		),
		children: [
			{ index: true, element: <Home /> },
			{ path: "notifications", element: <Notifications /> },
			{ path: "plans/:planId", element: <Tasks /> },
			{
				path: "settings",
				element: <SettingsLayout />,
				children: [
					{ index: true, element: <UserSettings /> },
					{ path: "plans", element: <PlanSettings /> },
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

function PageLoader() {
	return (
		<Container className='grid place-items-center h-dvh'>Loading...</Container>
	);
}

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<Provider store={store}>
				<TogglePlanProvider>
					<Suspense fallback={<PageLoader />}>
						<RouterProvider router={router} />
					</Suspense>
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
