import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { 
            phone, 
            fullName, 
            address, 
            service, 
            speed, 
            equipment, 
            deniedProviders, 
            deniedOther, 
            connectionTiming, 
            connectionDate, 
            connectionTime, 
            autoSelect 
        } = body

        const quizSummary = `
Услуга: ${service}
Скорость: ${speed}
Оборудование: ${equipment}
Отказ от: ${deniedProviders?.join(', ') || 'нет'} ${deniedOther ? `(${deniedOther})` : ''}
Время: ${connectionTiming === 'choose' ? `${connectionDate} в ${connectionTime}` : connectionTiming}
Авто-подбор: ${autoSelect ? 'Да' : 'Нет'}
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

        if (!response.ok) throw new Error("Bitrix Error")

        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error("Ошибка:", error)
        return NextResponse.json({ ok: false }, { status: 500 })
    }
}