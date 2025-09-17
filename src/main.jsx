import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";

import GlobalStyles from "../src/styles/GlobalyStyles";
import ErrorFallback from "./Fallback";

import App from "./App";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<GlobalStyles />
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => window.location.replace("/")}>
			<App />
		</ErrorBoundary>
	</StrictMode>
);
