import { NextRequest, NextResponse } from "next/server"

type ContactRequestBody = {
	phone?: unknown
	title?: unknown
	source?: unknown
}

type BitrixResponse = {
	result?: unknown
	error?: string
	error_description?: string
}

function normalizeString(value: unknown): string {
	return typeof value === "string" ? value.trim() : ""
}

function getBitrixDealUrl(): string | null {
	const baseUrl = (process.env.BITRIX_WEBHOOK_URL || "").trim()
	if (!baseUrl) return null
	return `${baseUrl.replace(/\/$/, "")}/crm.deal.add.json`
}

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const body = (await req.json()) as ContactRequestBody
		const phone = normalizeString(body.phone)
		const title = normalizeString(body.title)
		const source = normalizeString(body.source)

		if (!phone) {
			return NextResponse.json({ ok: false, error: "Телефон обязателен" }, { status: 400 })
		}

		const finalUrl = getBitrixDealUrl()
		if (!finalUrl) {
			console.warn("BITRIX_WEBHOOK_URL is missing; contact lead was accepted without CRM sync", {
				phone,
				title,
				source,
			})
			return NextResponse.json({ ok: true, crm: "skipped" }, { status: 200 })
		}

		const bitrixPayload = {
			fields: {
				TITLE: title || "Заявка с сайта ДомаТелеком",
				STAGE_ID: process.env.BITRIX_STAGE_ID || "5",
				ASSIGNED_BY_ID: process.env.BITRIX_ASSIGNED_BY_ID || "0",
				CURRENCY_ID: "RUB",
				UTM_SOURCE: process.env.BITRIX_UTM_SOURCE,
				UTM_MEDIUM: process.env.BITRIX_UTM_MEDIUM,
				UTM_CAMPAIGN: process.env.BITRIX_UTM_CAMPAIGN,
				UF_CRM_1605781310: source,
				UF_CRM_1604651268: phone,
				UF_CRM_1604651322: title,
			},
		}

		const bitrixResponse = await fetch(finalUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(bitrixPayload),
			signal: AbortSignal.timeout(10000),
		})

		const bitrixResult = (await bitrixResponse.json()) as BitrixResponse

		if (!bitrixResponse.ok || bitrixResult.error) {
			console.error("Bitrix contact error:", bitrixResult.error_description ?? bitrixResult.error ?? bitrixResult)
			return NextResponse.json(
				{ ok: false, error: "Ошибка отправки заявки" },
				{ status: 502 }
			)
		}

		return NextResponse.json({ ok: true }, { status: 200 })
	} catch (error) {
		console.error("CONTACT_FORM_ERROR", error)
		return NextResponse.json({ ok: false, error: "Ошибка сервера" }, { status: 500 })
	}
}
