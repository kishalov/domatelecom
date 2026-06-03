import { NextRequest, NextResponse } from "next/server"
import { BitrixRequestError, callBitrixMethod } from "@/lib/bitrix"

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const body = await req.json()
		const { phone, title, source } = body

		if (!phone) {
			return NextResponse.json({ ok: false, error: "Телефон обязателен" }, { status: 400 })
		}

		const bitrixPayload = {
			fields: {
				"TITLE": "Заявка с сайта ДомаТелеком",
				"STAGE_ID": process.env.BITRIX_STAGE_ID || "5",
				"ASSIGNED_BY_ID": process.env.BITRIX_ASSIGNED_BY_ID || "0",
				"CURRENCY_ID": "RUB",
				"SOURCE_ID": "WEB",
				"UTM_SOURCE": process.env.BITRIX_UTM_SOURCE,
				"UTM_MEDIUM": process.env.BITRIX_UTM_MEDIUM,
				"UTM_CAMPAIGN": process.env.BITRIX_UTM_CAMPAIGN,
				"UF_CRM_1605781310": source,
				"UF_CRM_1604651268": phone,
				"UF_CRM_1604651322": title,
			},
		}

		await callBitrixMethod("crm.deal.add", bitrixPayload)

		return NextResponse.json({ ok: true }, { status: 200 })
	} catch (error) {
		console.error("CONTACT_FORM_ERROR", error)

		if (error instanceof BitrixRequestError) {
			return NextResponse.json({ ok: false, error: error.message }, { status: 502 })
		}

		return NextResponse.json({ ok: false, error: "Ошибка сервера" }, { status: 500 })
	}
}
