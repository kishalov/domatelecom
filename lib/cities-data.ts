import * as XLSX from "xlsx"
import path from "path"
import fs from "fs"

export type CityEntry = {
	name: string
	region: string | null
}

type ParsedCitiesData = {
	items: CityEntry[]
	providersMap: Map<string, string[]>
}

type CacheShape = {
	mtimeMs: number
	data: ParsedCitiesData
}

let CACHE: CacheShape | null = null

function normHeader(v: unknown): string {
	return String(v ?? "")
		.replace(/\s+/g, " ")
		.trim()
		.toLowerCase()
}

function normalizeText(v: unknown): string {
	return String(v ?? "")
		.replace(/\s+/g, " ")
		.trim()
}

function normalizeCityName(raw: string): string {
	return normalizeText(raw).replace(/\s*г\.?\s*$/i, "").trim()
}

function makeKey(region: string, city: string): string {
	return `${normalizeText(region)}|${normalizeCityName(city)}`.toLowerCase()
}

function findHeaderRow(grid: unknown[][]): number {
	for (let i = 0; i < Math.min(grid.length, 40); i++) {
		const row: string[] = (grid[i] ?? []).map(normHeader)
		const hasRegion: boolean = row.some((x) => x === "область" || x.includes("область") || x.includes("край") || x.includes("республика"))
		const hasCity: boolean = row.some((x) => x.includes("город/нп"))
		if (hasRegion && hasCity) {
			return i
		}
	}
	return -1
}

function parseFile(): ParsedCitiesData {
	const filePath: string = path.join(process.cwd(), "app", "data", "cities.xlsx")
	const stat: fs.Stats = fs.statSync(filePath)

	if (CACHE && CACHE.mtimeMs === stat.mtimeMs) {
		return CACHE.data
	}

	const buf: Buffer = fs.readFileSync(filePath)
	const wb: XLSX.WorkBook = XLSX.read(buf, { type: "buffer" })
	const sheet: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]]
	const grid: unknown[][] = XLSX.utils.sheet_to_json(sheet, {
		header: 1,
		defval: "",
		blankrows: false,
	}) as unknown[][]

	const headerRowIndex: number = findHeaderRow(grid)
	if (headerRowIndex === -1) {
		const empty: ParsedCitiesData = {
			items: [],
			providersMap: new Map(),
		}
		CACHE = { mtimeMs: stat.mtimeMs, data: empty }
		return empty
	}

	const headers: string[] = (grid[headerRowIndex] ?? []).map(normHeader)

	const regionCol: number = headers.findIndex((h) =>
		h === "область" || h.includes("область") || h.includes("край") || h.includes("республика")
	)

	const cityCol: number = headers.findIndex((h) => h.includes("город/нп"))

	const providerCols: number[] = headers
		.map((h, i) => ({ h, i }))
		.filter((x) => x.h.startsWith("провайдер"))
		.map((x) => x.i)

	const seen: Set<string> = new Set()
	const items: CityEntry[] = []
	const providersMap: Map<string, string[]> = new Map()

	for (let r = headerRowIndex + 1; r < grid.length; r++) {
		const row: unknown[] = grid[r] ?? []

		const regionRaw: string = regionCol >= 0 ? normalizeText(row[regionCol]) : ""
		const cityRaw: string = cityCol >= 0 ? normalizeText(row[cityCol]) : ""

		if (!regionRaw || !cityRaw) continue

		const cityName: string = normalizeCityName(cityRaw)
		if (!cityName) continue

		const region: string | null = regionRaw || null
		const uniqKey: string = `${cityName}__${region ?? ""}`

		if (!seen.has(uniqKey)) {
			seen.add(uniqKey)
			items.push({ name: cityName, region })
		}

		const providers: string[] = providerCols
			.map((colIndex) => normalizeText(row[colIndex]))
			.filter(Boolean)

		const uniqueProviders: string[] = Array.from(new Set(providers))

		providersMap.set(makeKey(regionRaw, cityName), uniqueProviders)
	}

	const data: ParsedCitiesData = { items, providersMap }
	CACHE = { mtimeMs: stat.mtimeMs, data }
	return data
}

export function getAllCities(): CityEntry[] {
	return parseFile().items
}

export function getProvidersForCity(region: string, city: string): string[] {
	const map: Map<string, string[]> = parseFile().providersMap
	return map.get(makeKey(region, city)) ?? []
}