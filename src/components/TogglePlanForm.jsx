/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from "react";

const TogglePlanContext = createContext();

function TogglePlanProvider({ children }) {
	const [showForm, setShowForm] = useState(false);

	const toggleShowForm = () => {
		setShowForm((s) => !s);
	};

	return (
		<TogglePlanContext.Provider value={{ showForm, toggleShowForm }}>
			{children}
		</TogglePlanContext.Provider>
	);
}

function useTogglePlan() {
	const context = useContext(TogglePlanContext);

	if (!context) {
		throw new Error("useTogglePlan must be used within a TogglePlanProvider");
	}

	return context;
}

export { TogglePlanProvider, useTogglePlan };
