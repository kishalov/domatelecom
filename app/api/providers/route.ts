import { NextRequest, NextResponse } from "next/server"
import { getProvidersForCity, type ProviderItem } from "@/lib/providers"

export const runtime = "nodejs"

export async function GET(req: NextRequest) {
	try {
		const region: string = req.nextUrl.searchParams.get("region") ?? ""
		const city: string = req.nextUrl.searchParams.get("city") ?? ""

		if (!region || !city) {
			return NextResponse.json({ providers: [] }, { status: 200 })
		}

		const providers: ProviderItem[] = getProvidersForCity(region, city)

		return NextResponse.json(
			{ providers },
			{
				headers: {
					"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
				},
			}
		)
	} catch {
		return NextResponse.json({ providers: [] }, { status: 500 })
	}
}