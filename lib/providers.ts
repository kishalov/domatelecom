import * as XLSX from "xlsx"
import path from "path"
import fs from "fs"

type ProvidersMap = Map<string, string[]>

export type ProviderItem = {
	name: string
	logo: string | null
}

let CACHE: ProvidersMap | null = null

function normalize(s: string): string {
	return String(s ?? "")
		.replace(/\s+/g, " ")
		.replace(/\s*г\.?\s*$/i, "")
		.trim()
}

function key(region: string, city: string): string {
	return `${normalize(region)}|${normalize(city)}`.toLowerCase()
}

function providerLogoByName(name: string): string | null {
	const n: string = normalize(name).toLowerCase()

	if (n === "мтс") return "/providery/mts.svg"
	if (n === "билайн") return "/providery/bilain.svg"
	if (n === "дом.ру" || n === "домру") return "/providery/domru.svg"
	if (n === "мегафон") return "/providery/megaphone.svg"
	if (n === "ростелеком") return "/providery/rostelecom.svg"
	if (n === "сибирский медведь") return "/providery/sibmed.svg"
	if (n === "skynet") return "/providery/skynet.svg"
	if (n === "ттк") return "/providery/ttk.svg"
	if (n === "новотелеком") return "/providery/novtele.svg"
	if (n === "акадо") return "/providery/akado.svg"
	if (n === "пакт") return "/providery/pakt.svg"
	if (n === "алмател") return "/providery/almatel.png"
	if (n === "таттелеком") return "/providery/tattelecom.png"
	if (n === "яр.com") return "/providery/yarcom.png"
	if (n === "уфанет") return "/providery/ufanet.png"
	if (n === "орион телеком") return "/providery/orion.png"
	if (n === "аксиома") return "/providery/axioma24.png"
	if (n === "электронный город") return "/providery/elgorod.svg"

	return null
}

export function getProvidersForCity(region: string, city: string): ProviderItem[] {
	const map: ProvidersMap = loadAddressBase()
	const k: string = key(region, city)
	const providers: string[] = map.get(k) ?? []

	return providers.map((name) => ({
		name,
		logo: providerLogoByName(name),
	}))
}

function loadAddressBase(): ProvidersMap {
	if (CACHE) return CACHE

	const filePath: string = path.join(process.cwd(), "app", "data", "cities.xlsx")
	const buf: Buffer = fs.readFileSync(filePath)
	const wb: XLSX.WorkBook = XLSX.read(buf, { type: "buffer" })
	const sheet: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]]
	const rows: unknown[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" }) as unknown[][]

	const header: string[] = (rows[0] ?? []).map((h: unknown) => String(h ?? "").trim())

	const map: ProvidersMap = new Map()

	for (let i = 1; i < rows.length; i++) {
		const row: unknown[] = rows[i]
		if (!row || row.length < 2) continue

		const regionRaw: string = String(row[0] ?? "")
		const cityRaw: string = String(row[1] ?? "")

		const regionNorm: string = normalize(regionRaw)
		const cityNorm: string = normalize(cityRaw)

		if (!regionNorm || !cityNorm) continue

		const providers: string[] = []

		for (let c = 2; c < header.length; c++) {
			const cell: string = String(row[c] ?? "").trim()
			if (!cell) continue

			const cellLower: string = cell.toLowerCase()
			const looksLikeBool: boolean =
				cellLower === "1" ||
				cellLower === "да" ||
				cellLower === "true" ||
				cellLower === "истина" ||
				cellLower === "yes" ||
				cellLower === "+"

			if (looksLikeBool) {
				const fromHeader: string = header[c] ?? ""
				if (fromHeader) providers.push(fromHeader)
				continue
			}

			providers.push(cell)
		}

		const uniq: string[] = Array.from(
			new Set(providers.map((p) => normalize(p)).filter(Boolean))
		)

		map.set(key(regionNorm, cityNorm), uniq)
	}

	CACHE = map
	return map
}