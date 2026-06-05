import { NextRequest, NextResponse } from "next/server"

type QuizRequestBody = {
	phone?: unknown
	fullName?: unknown
	address?: unknown
	service?: unknown
	speed?: unknown
	equipment?: unknown
	deniedProviders?: unknown
	deniedOther?: unknown
	connectionTiming?: unknown
	connectionDate?: unknown
	connectionTime?: unknown
	autoSelect?: unknown
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
		const body = (await req.json()) as QuizRequestBody
		const phone = normalizeString(body.phone)
		const fullName = normalizeString(body.fullName)
		const address = normalizeString(body.address)
		const service = normalizeString(body.service)
		const speed = normalizeString(body.speed)
		const equipment = normalizeString(body.equipment)
		const deniedOther = normalizeString(body.deniedOther)
		const connectionTiming = normalizeString(body.connectionTiming)
		const connectionDate = normalizeString(body.connectionDate)
		const connectionTime = normalizeString(body.connectionTime)
		const deniedProviders = Array.isArray(body.deniedProviders)
			? body.deniedProviders.map(normalizeString).filter(Boolean)
			: []
		const autoSelect = body.autoSelect === true

		if (!phone) {
			return NextResponse.json({ ok: false, error: "Телефон обязателен" }, { status: 400 })
		}

		const quizSummary = `
Услуга: ${service || "не указано"}
Скорость: ${speed || "не указано"}
Оборудование: ${equipment || "не указано"}
Отказ от: ${deniedProviders.join(", ") || "нет"} ${deniedOther ? `(${deniedOther})` : ""}
Время: ${connectionTiming === "choose" ? `${connectionDate} в ${connectionTime}` : connectionTiming || "не указано"}
Авто-подбор: ${autoSelect ? "Да" : "Нет"}
		`.trim()

		const finalUrl = getBitrixDealUrl()
		if (!finalUrl) {
			console.warn("BITRIX_WEBHOOK_URL is missing; quiz lead was accepted without CRM sync", {
				phone,
				fullName,
				address,
				quizSummary,
			})
			return NextResponse.json({ ok: true, crm: "skipped" }, { status: 200 })
		}

		const bitrixPayload = {
			fields: {
				TITLE: `Квиз: ${fullName || "Новая заявка"}`,
				NAME: fullName,
				ADDRESS: address,
				COMMENTS: quizSummary,
				PHONE: [{ VALUE: phone, VALUE_TYPE: "WORK" }],
				SOURCE_ID: "WEB",
			},
		}

		const response = await fetch(finalUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(bitrixPayload),
			signal: AbortSignal.timeout(10000),
		})

		const bitrixResult = (await response.json()) as BitrixResponse

		if (!response.ok || bitrixResult.error) {
			console.error("Bitrix quiz error:", bitrixResult.error_description ?? bitrixResult.error ?? bitrixResult)
			return NextResponse.json(
				{ ok: false, error: "Ошибка отправки заявки" },
				{ status: 502 }
			)
		}

		return NextResponse.json({ ok: true })
	} catch (error) {
		console.error("QUIZ_FORM_ERROR", error)
		return NextResponse.json({ ok: false, error: "Ошибка сервера" }, { status: 500 })
	}
}
