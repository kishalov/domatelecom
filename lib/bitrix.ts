type BitrixErrorPayload = {
	error?: string
	error_description?: string
}

type BitrixResponse = BitrixErrorPayload & {
	result?: unknown
}

export class BitrixRequestError extends Error {
	constructor(
		message: string,
		readonly details?: unknown,
		readonly status?: number
	) {
		super(message)
		this.name = "BitrixRequestError"
	}
}

function getBitrixWebhookUrl(method: string): string {
	const baseUrl: string = (process.env.BITRIX_WEBHOOK_URL || "").trim().replace(/\/+$/, "")

	if (!baseUrl) {
		throw new BitrixRequestError("BITRIX_WEBHOOK_URL is missing")
	}

	if (baseUrl.endsWith(`/${method}`) || baseUrl.endsWith(`/${method}.json`)) {
		return baseUrl
	}

	return `${baseUrl}/${method}.json`
}

async function readBitrixResponse(response: Response): Promise<BitrixResponse> {
	const text: string = await response.text()

	if (!text) {
		return {}
	}

	try {
		return JSON.parse(text) as BitrixResponse
	} catch {
		throw new BitrixRequestError("Bitrix returned a non-JSON response", text, response.status)
	}
}

export async function callBitrixMethod(
	method: string,
	payload: Record<string, unknown>
): Promise<BitrixResponse> {
	const response: Response = await fetch(getBitrixWebhookUrl(method), {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	})

	const data: BitrixResponse = await readBitrixResponse(response)

	if (!response.ok || data.error) {
		throw new BitrixRequestError(
			data.error_description || data.error || `Bitrix HTTP error: ${response.status}`,
			data,
			response.status
		)
	}

	return data
}
