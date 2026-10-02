import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"
import { Toaster } from "react-hot-toast"
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"

import { ThemeModeProvider } from "./context/ThemeModeContext"
import store from "./Store/store"
import "./style.css"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
			gcTime: 1000 * 60 * 5,
			refetchOnWindowFocus: false,
			retry: 1,
		},
	},
})

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<link rel="icon" type="image/jpeg" href="/img/logo.jpg" />
				<link rel="apple-touch-icon" href="/img/logo.jpg" />
				<meta
					name="description"
					content="Plannerly helps students, individuals, and small teams turn busy days into focused action — tasks, goals, and plans in one calm place."
				/>
				<title>Plannerly | Task Planner</title>
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export default function Root() {
	return (
		<ThemeModeProvider>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<Provider store={store}>
					<Outlet />
				</Provider>
				<Toaster
					position="top-center"
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
		</ThemeModeProvider>
	)
}

export function ErrorBoundary() {}
