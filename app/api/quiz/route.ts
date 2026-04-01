import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()

		console.log("Новая заявка из квиза:", body)

		return NextResponse.json({
			ok: true,
			message: "Заявка получена",
		})
	} catch (error) {
		return NextResponse.json(
			{
				ok: false,
				message: "Ошибка обработки заявки",
			},
			{ status: 500 }
		)
	}
}