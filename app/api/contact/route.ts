import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const body = await req.json()
        const { phone, title, source } = body

        if (!phone) {
            return NextResponse.json({ ok: false, error: "Телефон обязателен" }, { status: 400 })
        }

        const baseUrl = (process.env.BITRIX_WEBHOOK_URL || "").trim()
        if (!baseUrl) {
            throw new Error("BITRIX_WEBHOOK_URL is missing")
        }

        const finalUrl = `${baseUrl.replace(/\/$/, '')}/crm.deal.add`

        const bitrixPayload = {
            fields: {
                "TITLE": "Заявка с сайта ДомаТелеком",
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

        const bitrixResponse = await fetch(finalUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bitrixPayload),
        })

        const bitrixResult = await bitrixResponse.json()

        if (bitrixResult.error) {
            console.error("Bitrix Error:", bitrixResult.error_description)
            return NextResponse.json({ ok: false, error: bitrixResult.error_description }, { status: 500 })
        }

        return NextResponse.json({ ok: true }, { status: 200 })

    } catch (error) {
        console.error("CONTACT_FORM_ERROR", error)
        return NextResponse.json({ ok: false, error: "Ошибка сервера" }, { status: 500 })
    }
}