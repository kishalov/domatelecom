import { NextResponse } from "next/server"
import { getAllCities, type CityEntry } from "@/lib/cities-data"

export const runtime = "nodejs"

type CitiesPayload = {
	popular: CityEntry[]
	sections: Array<{ letter: string; items: CityEntry[] }>
}

function groupByLetter(items: CityEntry[]): Array<{ letter: string; items: CityEntry[] }> {
	const map: Map<string, CityEntry[]> = new Map()

	for (const it of items) {
		const letter: string = it.name.trim().charAt(0).toUpperCase() || "#"
		if (!map.has(letter)) map.set(letter, [])
		map.get(letter)?.push(it)
	}

	const letters: string[] = Array.from(map.keys()).sort((a, b) =>
		a.localeCompare(b, "ru", { sensitivity: "base" })
	)

	return letters.map((letter) => {
		const arr: CityEntry[] = (map.get(letter) ?? []).sort((a, b) =>
			a.name.localeCompare(b.name, "ru", { sensitivity: "base" })
		)
		return { letter, items: arr }
	})
}

export async function GET() {
	try {
		const items: CityEntry[] = getAllCities()
		const sections = groupByLetter(items)

		const wantPopular: string[] = ["Москва", "Санкт-Петербург"]

		const popular: CityEntry[] = wantPopular
			.map((nm) => {
				const found = items.find((x) => x.name.toLowerCase() === nm.toLowerCase())
				return found ?? null
			})
			.filter(Boolean) as CityEntry[]

		const payload: CitiesPayload = { popular, sections }

		return NextResponse.json(payload, {
			headers: {
				"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
			},
		})
	} catch {
		return NextResponse.json({ popular: [], sections: [] }, { status: 500 })
	}
}