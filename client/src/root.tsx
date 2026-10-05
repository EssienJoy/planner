import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"
import { Toaster } from "react-hot-toast"
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from "react-router"

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

export function ErrorBoundary() {
	const error = useRouteError()
	const message = isRouteErrorResponse(error)
		? `${error.status} ${error.statusText || "Something went wrong."}`
		: error instanceof Error
			? error.message
			: "Something went wrong."

	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<title>Something went wrong | Plannerly</title>
				<Meta />
				<Links />
			</head>
			<body>
				<div className="grid min-h-dvh place-items-center bg-background px-4 py-10">
					<div className="w-full max-w-md rounded-3xl border border-border bg-surface p-8 text-center shadow-xl sm:p-10">
						<p className="text-xs font-bold uppercase tracking-widest text-primary">
							Error
						</p>
						<h1 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">
							Something went wrong
						</h1>
						<p
							role="alert"
							className="mt-4 rounded-xl border border-error/30 bg-error-muted px-4 py-3 text-sm font-semibold text-error-foreground">
							{message}
						</p>
						<div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
							<button
								type="button"
								onClick={() => window.location.reload()}
								className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-white transition-all hover:bg-primary/90">
								Try again
							</button>
							<a
								href="/"
								className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-primary bg-primary-subtle px-4 text-sm font-medium text-primary transition-all hover:bg-[var(--color-primary-muted)]">
								Go home
							</a>
						</div>
					</div>
				</div>
				<Scripts />
			</body>
		</html>
	)
}
