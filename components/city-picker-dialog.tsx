"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Virtuoso } from "react-virtuoso"

type CityEntry = {
	name: string
	region: string | null
}

type Section = {
	letter: string
	items: CityEntry[]
}

type Payload = {
	popular: CityEntry[]
	sections: Section[]
}

type CitiesApiResponse = Partial<Payload>

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
	value: CityEntry | null
	onSelect: (city: CityEntry) => void
}

type ListItem = CityEntry | Section

function useDebouncedValue<T>(value: T, delayMs: number): T {
	const [debounced, setDebounced] = React.useState<T>(value)

	React.useEffect(() => {
		const t: number = window.setTimeout(() => setDebounced(value), delayMs)
		return () => window.clearTimeout(t)
	}, [value, delayMs])

	return debounced
}

function normalizeSearch(s: string): string {
	return String(s ?? "")
		.toLowerCase()
		.replace(/\s+/g, " ")
		.trim()
}

function compactSearch(s: string): string {
	return normalizeSearch(s).replace(/\s+/g, "")
}

function scoreCity(query: string, city: CityEntry): number {
	const q: string = compactSearch(query)
	const name: string = compactSearch(city.name)
	const region: string = compactSearch(city.region ?? "")
	const full: string = compactSearch(`${city.name} ${city.region ?? ""}`)

	if (!q) return 0

	if (name === q) return 1000
	if (name.startsWith(q)) return 800
	if (name.includes(q)) return 500

	if (full.startsWith(q)) return 300
	if (full.includes(q)) return 250

	if (region === q) return 200
	if (region.startsWith(q)) return 150
	if (region.includes(q)) return 100

	return 0
}

function isSection(item: ListItem): item is Section {
	return "letter" in item && "items" in item
}

export default function CityPickerDialog(props: Props) {
	const [data, setData] = React.useState<Payload | null>(null)
	const [query, setQuery] = React.useState<string>("")
	const [loading, setLoading] = React.useState<boolean>(false)

	React.useEffect(() => {
		if (!props.open) return
		if (data) return

		const load = async (): Promise<void> => {
			setLoading(true)

			try {
				const res: Response = await fetch("/api/cities")

				const jsonAny = (await res.json()) as CitiesApiResponse

				const popular: CityEntry[] = Array.isArray(jsonAny.popular) ? jsonAny.popular : []
				const sections: Section[] = Array.isArray(jsonAny.sections) ? jsonAny.sections : []

				setData({ popular, sections })
			} finally {
				setLoading(false)
			}
		}

		void load()
	}, [props.open, data])

	const debouncedQuery: string = useDebouncedValue(query, 120)
	const q: string = React.useDeferredValue(debouncedQuery).trim()
	const hasQuery: boolean = q.length > 0

	const allCities: CityEntry[] = React.useMemo(() => {
		if (!data) return []

		const seen: Set<string> = new Set()
		const out: CityEntry[] = []

		for (const sec of data.sections) {
			for (const it of sec.items) {
				const k: string = `${it.name}__${it.region ?? ""}`
				if (seen.has(k)) continue
				seen.add(k)
				out.push(it)
			}
		}

		return out
	}, [data])

	const searchResults: CityEntry[] = React.useMemo(() => {
		if (!hasQuery) return []

		return allCities
			.map((city) => ({
				city,
				score: scoreCity(q, city),
			}))
			.filter((x) => x.score > 0)
			.sort((a, b) => {
				if (b.score !== a.score) return b.score - a.score

				const byName: number = a.city.name.localeCompare(b.city.name, "ru", {
					sensitivity: "base",
				})
				if (byName !== 0) return byName

				return (a.city.region ?? "").localeCompare(b.city.region ?? "", "ru", {
					sensitivity: "base",
				})
			})
			.slice(0, 200)
			.map((x) => x.city)
	}, [allCities, hasQuery, q])

	const listData: ListItem[] = React.useMemo(() => {
		if (!data) return []
		return hasQuery ? searchResults : data.sections
	}, [data, hasQuery, searchResults])

	const onPick = React.useCallback(
		(city: CityEntry) => {
			props.onSelect(city)
			props.onOpenChange(false)
		},
		[props]
	)

	return (
		<Dialog open={props.open} onOpenChange={props.onOpenChange}>
			<DialogContent className="overflow-hidden p-0 sm:max-w-[1200px]">
				<div className="p-8 pb-4">
					<DialogHeader>
						<DialogTitle className="text-2xl font-semibold">
							Введите город или регион
						</DialogTitle>
					</DialogHeader>

					<div className="mt-4">
						<Input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Введите город или регион"
							className="h-11"
							autoFocus
						/>
					</div>
				</div>

				<div className="h-[520px] px-8 pb-8">
					{loading || !data ? (
						<div className="py-10 text-sm text-muted-foreground">Загрузка…</div>
					) : (
						<Virtuoso<ListItem>
							style={{ height: "100%" }}
							data={listData}
							components={{
								Header: () =>
									!hasQuery ? (
										<div className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-4">
											{data.popular.map((it) => (
												<button
													key={`${it.name}__${it.region ?? ""}`}
													type="button"
													onClick={() => onPick(it)}
													className="text-left text-sm font-semibold transition hover:opacity-80"
												>
													{it.name}
												</button>
											))}
										</div>
									) : (
										<div className="mb-4" />
									),
								Footer: () =>
									hasQuery && searchResults.length === 0 ? (
										<div className="py-6 text-sm text-muted-foreground">
											Ничего не найдено
										</div>
									) : (
										<div />
									),
							}}
							itemContent={(_, item) => {
								if (!isSection(item)) {
									const it: CityEntry = item
									const active: boolean =
										(props.value?.name ?? "") === it.name &&
										(props.value?.region ?? "") === (it.region ?? "")

									return (
										<button
											type="button"
											onClick={() => onPick(it)}
											className={cn(
												"w-full border-b py-3 text-left last:border-b-0",
												active && "font-semibold"
											)}
										>
											<div className="text-sm">{it.name}</div>
											{it.region ? (
												<div className="text-xs text-muted-foreground">
													{it.region}
												</div>
											) : null}
										</button>
									)
								}

								const sec: Section = item

								return (
									<div className="mb-10">
										<div className="mb-4 text-sm font-semibold text-primary">
											{sec.letter}
										</div>

										<div className="columns-1 gap-10 md:columns-2 lg:columns-3">
											{sec.items.map((it) => {
												const active: boolean =
													(props.value?.name ?? "") === it.name &&
													(props.value?.region ?? "") === (it.region ?? "")

												return (
													<button
														key={`${it.name}__${it.region ?? ""}`}
														type="button"
														onClick={() => onPick(it)}
														className={cn(
															"w-full break-inside-avoid py-2 text-left",
															active && "font-semibold"
														)}
													>
														<div className="text-sm">{it.name}</div>
														{it.region ? (
															<div className="text-xs text-muted-foreground">
																{it.region}
															</div>
														) : null}
													</button>
												)
											})}
										</div>
									</div>
								)
							}}
						/>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}