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
        
        if (!phone) {
            return NextResponse.json({ ok: false, error: "Телефон обязателен" }, { status: 400 })
        }

        const bitrixPayload = {
            fields: {
                "TITLE": "Заявка с сайта",
                "STAGE_ID": process.env.BITRIX_STAGE_ID || "5",
                "ASSIGNED_BY_ID": process.env.BITRIX_ASSIGNED_BY_ID || "0",
                "CURRENCY_ID": "RUB",
                "UTM_SOURCE": process.env.BITRIX_UTM_SOURCE,
                "UTM_MEDIUM": process.env.BITRIX_UTM_MEDIUM,
                "UTM_CAMPAIGN": process.env.BITRIX_UTM_CAMPAIGN,
                
                "UF_CRM_1605781310": source,      
                "UF_CRM_1604651268": phone,        
                "UF_CRM_1604651322": title,         
            }
        }

        const webhookUrl = process.env.BITRIX_WEBHOOK_URL;

        if (!webhookUrl) {
            console.error("BITRIX_WEBHOOK_URL is not defined in .env.local");
            return NextResponse.json({ ok: false, error: "Ошибка конфигурации сервера" }, { status: 500 });
        }

        const bitrixResponse = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bitrixPayload),
        })

        const bitrixResult = await bitrixResponse.json()

        if (!bitrixResponse.ok) {
            console.error("Bitrix API Error:", bitrixResult)
            throw new Error("Bitrix response not OK")
        }

        return NextResponse.json({ ok: true, message: "Заявка принята" }, { status: 200 })

    } catch (error) {
        console.error("CONTACT_FORM_ERROR", error)
        return NextResponse.json({ ok: false, error: "Не удалось отправить заявку" }, { status: 500 })
    }
}