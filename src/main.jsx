import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";

import "./style.css";

import App from "./App";
import ErrorFallback from "./components/Fallback";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => window.location.replace("/")}>
			<App />
		</ErrorBoundary>
	</StrictMode>,
);
