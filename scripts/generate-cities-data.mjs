import fs from "node:fs"
import path from "node:path"
import * as XLSX from "xlsx"

function normHeader(value) {
	return String(value ?? "")
		.replace(/\s+/g, " ")
		.trim()
		.toLowerCase()
}

function normalizeText(value) {
	return String(value ?? "")
		.replace(/\s+/g, " ")
		.trim()
}

function normalizeCityName(raw) {
	return normalizeText(raw).replace(/\s*г\.?\s*$/i, "").trim()
}

function makeKey(region, city) {
	return `${normalizeText(region)}|${normalizeCityName(city)}`.toLowerCase()
}

function findHeaderRow(grid) {
	for (let i = 0; i < Math.min(grid.length, 40); i++) {
		const row = (grid[i] ?? []).map(normHeader)
		const hasRegion = row.some(
			(x) => x === "область" || x.includes("область") || x.includes("край") || x.includes("республика")
		)
		const hasCity = row.some((x) => x.includes("город/нп"))
		if (hasRegion && hasCity) return i
	}

	return -1
}

const root = process.cwd()
const sourcePath = path.join(root, "app", "data", "cities.xlsx")
const outputPath = path.join(root, "app", "data", "cities.generated.json")

const buffer = fs.readFileSync(sourcePath)
const workbook = XLSX.read(buffer, { type: "buffer" })
const sheet = workbook.Sheets[workbook.SheetNames[0]]
const grid = XLSX.utils.sheet_to_json(sheet, {
	header: 1,
	defval: "",
	blankrows: false,
})

const headerRowIndex = findHeaderRow(grid)

if (headerRowIndex === -1) {
	throw new Error("Не удалось найти строку заголовков в app/data/cities.xlsx")
}

const headers = (grid[headerRowIndex] ?? []).map(normHeader)
const regionCol = headers.findIndex(
	(h) => h === "область" || h.includes("область") || h.includes("край") || h.includes("республика")
)
const cityCol = headers.findIndex((h) => h.includes("город/нп"))
const providerCols = headers
	.map((h, index) => ({ h, index }))
	.filter((item) => item.h.startsWith("провайдер"))
	.map((item) => item.index)

const seenCities = new Set()
const items = []
const providersByKey = new Map()

for (let rowIndex = headerRowIndex + 1; rowIndex < grid.length; rowIndex++) {
	const row = grid[rowIndex] ?? []
	const regionRaw = regionCol >= 0 ? normalizeText(row[regionCol]) : ""
	const cityRaw = cityCol >= 0 ? normalizeText(row[cityCol]) : ""

	if (!regionRaw || !cityRaw) continue

	const cityName = normalizeCityName(cityRaw)
	if (!cityName) continue

	const uniqueCityKey = `${cityName}__${regionRaw}`
	if (!seenCities.has(uniqueCityKey)) {
		seenCities.add(uniqueCityKey)
		items.push({ name: cityName, region: regionRaw })
	}

	const providers = Array.from(
		new Set(providerCols.map((colIndex) => normalizeText(row[colIndex])).filter(Boolean))
	)

	providersByKey.set(makeKey(regionRaw, cityName), {
		region: regionRaw,
		city: cityName,
		providers,
	})
}

const data = {
	items,
	providers: Array.from(providersByKey.values()),
}

fs.writeFileSync(outputPath, `${JSON.stringify(data, null, 2)}\n`)
console.log(`Generated ${outputPath}: ${items.length} cities, ${data.providers.length} provider rows`)
