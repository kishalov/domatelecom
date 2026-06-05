import { getProviderNamesForCity } from "@/lib/cities-data"

export type ProviderItem = {
	name: string
	logo: string | null
}

function normalize(s: string): string {
	return String(s ?? "")
		.replace(/\s+/g, " ")
		.replace(/\s*г\.?\s*$/i, "")
		.trim()
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
	if (n === "алмател") return "/providery/almatel.webp"
	if (n === "таттелеком") return "/providery/tattelecom.png"
	if (n === "яр.com") return "/providery/yarcom.png"
	if (n === "уфанет") return "/providery/ufanet.png"
	if (n === "орион телеком") return "/providery/orion.png"
	if (n === "аксиома") return "/providery/axioma24.png"
	if (n === "электронный город") return "/providery/elgorod.svg"

	return null
}

export function getProvidersForCity(region: string, city: string): ProviderItem[] {
	return getProviderNamesForCity(region, city).map((name) => ({
		name,
		logo: providerLogoByName(name),
	}))
}
