import { useCallback, useState } from "react";

export function useTogglePlan(initialOpen = false) {
	const [showForm, setShowForm] = useState(initialOpen);

	const toggleShowForm = useCallback(() => {
		setShowForm((current) => !current);
	}, []);

	return { showForm, setShowForm, toggleShowForm };
}
