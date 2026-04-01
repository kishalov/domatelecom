"use client"

import * as React from "react"
import CityPickerDialog from "@/components/city-picker-dialog"

export type CityEntry = { name: string; region: string | null }

type CityContextValue = {
	city: CityEntry | null
	setCity: (city: CityEntry | null) => void
	openPicker: () => void
	closePicker: () => void
}

const CityContext = React.createContext<CityContextValue | null>(null)

const STORAGE_KEY: string = "domatelecom_city_v1"

export function CityProvider(props: { children: React.ReactNode }) {
	const [city, setCityState] = React.useState<CityEntry | null>(null)
	const [open, setOpen] = React.useState<boolean>(false)

	React.useEffect(() => {
		void fetch("/api/cities")
	}, [])

	React.useEffect(() => {
		try {
			const raw: string | null = window.localStorage.getItem(STORAGE_KEY)
			if (!raw) return
			const parsed: unknown = JSON.parse(raw)
			if (parsed && typeof parsed === "object") {
				const obj = parsed as { name?: unknown; region?: unknown }
				if (typeof obj.name === "string") {
					setCityState({ name: obj.name, region: typeof obj.region === "string" ? obj.region : null })
				}
			}
		} catch {
		}
	}, [])

	const setCity = React.useCallback((next: CityEntry | null) => {
		setCityState(next)
		try {
			if (!next) {
				window.localStorage.removeItem(STORAGE_KEY)
			} else {
				window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
			}
		} catch {
		}
	}, [])

	const openPicker = React.useCallback(() => setOpen(true), [])
	const closePicker = React.useCallback(() => setOpen(false), [])

	const ctx: CityContextValue = React.useMemo(
		() => ({ city, setCity, openPicker, closePicker }),
		[city, setCity, openPicker, closePicker]
	)

	return (
		<CityContext.Provider value={ctx}>
			{props.children}

			<CityPickerDialog
				open={open}
				onOpenChange={setOpen}
				value={city}
				onSelect={setCity}
			/>
		</CityContext.Provider>
	)
}

export function useCity() {
	const ctx = React.useContext(CityContext)
	if (!ctx) {
		throw new Error("useCity must be used within <CityProvider>")
	}
	return ctx
}