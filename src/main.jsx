import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";

import "./style.css";
import ErrorFallback from "./Fallback";

import App from "./App";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => window.location.replace("/")}>
			<App />
		</ErrorBoundary>
	</StrictMode>
);
