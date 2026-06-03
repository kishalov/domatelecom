import { NextRequest, NextResponse } from "next/server"
import { BitrixRequestError, callBitrixMethod } from "@/lib/bitrix"

type QuizPayload = {
	phone?: string
	fullName?: string
	address?: string
	service?: string
	speed?: string
	equipment?: string
	deniedProviders?: string[]
	deniedOther?: string
	connectionTiming?: string
	connectionDate?: string | null
	connectionTime?: string | null
	autoSelect?: boolean
}

function buildQuizSummary(data: QuizPayload): string {
	return `
ФИО: ${data.fullName || "не указано"}
Телефон: ${data.phone || "не указан"}
Адрес: ${data.address || "не указан"}
Услуга: ${data.service || "не указана"}
Скорость: ${data.speed || "не указана"}
Оборудование: ${data.equipment || "не указано"}
Отказ от: ${data.deniedProviders?.join(", ") || "нет"} ${data.deniedOther ? `(${data.deniedOther})` : ""}
Время: ${data.connectionTiming === "choose" ? `${data.connectionDate || "дата не указана"} в ${data.connectionTime || "время не указано"}` : data.connectionTiming || "не указано"}
Авто-подбор: ${data.autoSelect ? "Да" : "Нет"}
	`.trim()
}

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const body = await req.json() as QuizPayload

		if (!body.phone?.trim()) {
			return NextResponse.json({ ok: false, error: "Телефон обязателен" }, { status: 400 })
		}

		const title: string = `Квиз: ${body.fullName || "Новая заявка"}`
		const bitrixPayload = {
			fields: {
				"TITLE": title,
				"STAGE_ID": process.env.BITRIX_STAGE_ID || "5",
				"ASSIGNED_BY_ID": process.env.BITRIX_ASSIGNED_BY_ID || "0",
				"CURRENCY_ID": "RUB",
				"SOURCE_ID": "WEB",
				"COMMENTS": buildQuizSummary(body),
				"UTM_SOURCE": process.env.BITRIX_UTM_SOURCE,
				"UTM_MEDIUM": process.env.BITRIX_UTM_MEDIUM,
				"UTM_CAMPAIGN": process.env.BITRIX_UTM_CAMPAIGN,
				"UF_CRM_1605781310": "Квиз",
				"UF_CRM_1604651268": body.phone,
				"UF_CRM_1604651322": title,
			},
		}

		await callBitrixMethod("crm.deal.add", bitrixPayload)

		return NextResponse.json({ ok: true })
	} catch (error) {
		console.error("QUIZ_FORM_ERROR", error)

		if (error instanceof BitrixRequestError) {
			return NextResponse.json({ ok: false, error: error.message }, { status: 502 })
		}

		return NextResponse.json({ ok: false, error: "Ошибка сервера" }, { status: 500 })
	}
}
