import { createContext, useContext, useMemo, useState } from "react"
import type { ReactNode } from "react"

type Theme = "light" | "dark"

interface ThemeModeValue {
	theme: Theme
	dark: boolean
	toggle: () => void
	setTheme: (theme: Theme) => void
}

const STORAGE_KEY = "plannerly-theme"

function getInitialTheme(): Theme {
	if (typeof window === "undefined") return "light"
	try {
		const stored = window.localStorage.getItem(STORAGE_KEY)
		if (stored === "dark" || stored === "light") return stored
	} catch {
		// storage unavailable — fall through to OS preference
	}
	if (
		typeof window.matchMedia === "function" &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	) {
		return "dark"
	}
	return "light"
}

function applyTheme(theme: Theme) {
	if (typeof document === "undefined") return
	document.documentElement.classList.toggle("dark", theme === "dark")
	try {
		window.localStorage.setItem(STORAGE_KEY, theme)
	} catch {
		// storage unavailable — theme still applies for this session
	}
}

const ThemeModeContext = createContext<ThemeModeValue | null>(null)

function ThemeModeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(getInitialTheme)

	// Applied synchronously during render instead of in an effect.
	// Both operations are idempotent, so repeated renders are harmless.
	applyTheme(theme)

	const value = useMemo<ThemeModeValue>(
		() => ({
			theme,
			dark: theme === "dark",
			toggle: () =>
				setThemeState((current) =>
					current === "dark" ? "light" : "dark",
				),
			setTheme: setThemeState,
		}),
		[theme],
	)

	return (
		<ThemeModeContext.Provider value={value}>
			{children}
		</ThemeModeContext.Provider>
	)
}

function useThemeMode() {
	const context = useContext(ThemeModeContext)
	if (!context) {
		throw new Error("useThemeMode must be used within ThemeModeProvider")
	}
	return context
}

export { ThemeModeProvider, useThemeMode }
export type { Theme, ThemeModeValue }
