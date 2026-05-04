import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
		console.log("ПОЛУЧЕНО ОТ КЛИЕНТА:", body)
        
        // Извлекаем телефон и остальные данные
        const { phone, fullName, address } = body

        // Формируем текстовый блок со всеми ответами квиза
        const quizSummary = `
		Услуга: ${body.service}
		Скорость: ${body.speed} Мбит/с
		Оборудование: ${body.equipment}
		Провайдеры-исключения: ${body.deniedProviders?.join(', ') || 'нет'} ${body.deniedOther ? `(${body.deniedOther})` : ''}
		Время подключения: ${body.connectionTiming === 'choose' ? `${body.connectionDate} в ${body.connectionTime}` : body.connectionTiming}
		Авто-подбор: ${body.autoSelect ? 'Да' : 'Нет'}
        `.trim()

        const bitrixPayload = {
            fields: {
                "TITLE": `Квиз: ${fullName || "Новая заявка"}`,
                "NAME": fullName,
                "ADDRESS": address,
                "COMMENTS": quizSummary,
                "PHONE": [ { "VALUE": phone, "VALUE_TYPE": "WORK" } ],
                "SOURCE_ID": "WEB",
            }
        }

        const response = await fetch(`${process.env.BITRIX_WEBHOOK_URL}/crm.deal.add.json`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bitrixPayload),
        })

        const result = await response.json()

        if (!response.ok) throw new Error("Bitrix Error")

        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error("Ошибка отправки в Битрикс:", error)
        return NextResponse.json({ ok: false }, { status: 500 })
    }
}