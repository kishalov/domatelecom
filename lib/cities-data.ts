import citiesData from "@/app/data/cities.generated.json"

export type CityEntry = {
	name: string
	region: string | null
}

type ProviderEntry = {
	region: string
	city: string
	providers: string[]
}

type GeneratedCitiesData = {
	items: CityEntry[]
	providers: ProviderEntry[]
}

function normalizeText(value: string): string {
	return String(value ?? "")
		.replace(/\s+/g, " ")
		.trim()
}

function normalizeCityName(raw: string): string {
	return normalizeText(raw).replace(/\s*г\.?\s*$/i, "").trim()
}

function makeKey(region: string, city: string): string {
	return `${normalizeText(region)}|${normalizeCityName(city)}`.toLowerCase()
}

const data = citiesData as GeneratedCitiesData

const providersMap: Map<string, string[]> = new Map(
	data.providers.map((entry) => [
		makeKey(entry.region, entry.city),
		entry.providers,
	])
)

export function getAllCities(): CityEntry[] {
	return data.items
}

export function getProviderNamesForCity(region: string, city: string): string[] {
	return providersMap.get(makeKey(region, city)) ?? []
}
