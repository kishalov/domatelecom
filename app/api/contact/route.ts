import { NextRequest, NextResponse } from "next/server"

type ContactRequestBody = {
	phone?: string
	title?: string
	source?: string
	buttonText?: string
	placeholder?: string
	page?: string
}

function normalizePhone(phone: string): string {
	return phone.trim()
}

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const body = (await req.json()) as ContactRequestBody

		const phone: string = normalizePhone(body.phone ?? "")
		const title: string = String(body.title ?? "").trim()
		const source: string = String(body.source ?? "").trim()
		const buttonText: string = String(body.buttonText ?? "").trim()
		const placeholder: string = String(body.placeholder ?? "").trim()
		const page: string = String(body.page ?? "").trim()

		if (!phone) {
			return NextResponse.json(
				{
					ok: false,
					error: "Телефон обязателен",
				},
				{ status: 400 }
			)
		}

		const payload = {
			phone,
			title,
			source,
			buttonText,
			placeholder,
			page,
			createdAt: new Date().toISOString(),
		}

		console.log("CONTACT_FORM_SUBMIT", payload)

		return NextResponse.json(
			{
				ok: true,
				message: "Заявка принята",
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error("CONTACT_FORM_ERROR", error)

		return NextResponse.json(
			{
				ok: false,
				error: "Не удалось обработать заявку",
			},
			{ status: 500 }
		)
	}
}