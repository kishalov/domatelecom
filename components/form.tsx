"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type ContactFormProps = {
	title?: string
	buttonText?: string
	placeholder?: string
	disabled?: boolean
	onSubmit?: (phone: string) => void | Promise<void>
}

export function ContactForm({
	title = "Оставьте заявку",
	buttonText = "Отправить",
	placeholder = "+7 (999) 999-99-99",
	disabled = false,
	onSubmit,
}: ContactFormProps) {
	const [phone, setPhone] = React.useState<string>("")

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()

		if (disabled) {
			return
		}

		await onSubmit?.(phone)
	}

	return (
		<section className="w-full">
			<Card className="w-full rounded-3xl border-0">
				<CardHeader className="pb-4">
					<CardTitle className="text-2xl font-bold md:text-3xl">
						{title}
					</CardTitle>
				</CardHeader>

				<CardContent>
					<form
						onSubmit={handleSubmit}
						className="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch"
					>
						<Input
							type="tel"
							inputMode="tel"
							autoComplete="tel"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							placeholder={placeholder}
							className="min-w-0 flex-1"
							disabled={disabled}
						/>

						<Button type="submit" className="sm:w-auto" disabled={disabled}>
							{buttonText}
						</Button>
					</form>
				</CardContent>
			</Card>
		</section>
	)
}