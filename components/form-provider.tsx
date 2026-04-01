"use client"

import * as React from "react"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { ContactForm } from "./form"

type OpenContactFormOptions = {
	title?: string
	buttonText?: string
	placeholder?: string
	source?: string
}

type ContactFormContextValue = {
	openContactForm: (options?: OpenContactFormOptions) => void
	closeContactForm: () => void
}

type ContactApiResponse = {
	ok?: boolean
	error?: string
	message?: string
}

const ContactFormContext = React.createContext<ContactFormContextValue | null>(null)

export function ContactFormProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [open, setOpen] = React.useState<boolean>(false)
	const [title, setTitle] = React.useState<string>("Оставьте заявку")
	const [buttonText, setButtonText] = React.useState<string>("Отправить")
	const [placeholder, setPlaceholder] = React.useState<string>("+7 (999) 999-99-99")
	const [source, setSource] = React.useState<string>("")
	const [submitting, setSubmitting] = React.useState<boolean>(false)

	const openContactForm = React.useCallback((options?: OpenContactFormOptions): void => {
		setTitle(options?.title ?? "Оставьте заявку")
		setButtonText(options?.buttonText ?? "Отправить")
		setPlaceholder(options?.placeholder ?? "+7 (999) 999-99-99")
		setSource(options?.source ?? "")
		setOpen(true)
	}, [])

	const closeContactForm = React.useCallback((): void => {
		setOpen(false)
	}, [])

const handleSubmit = React.useCallback(async (phone: string): Promise<void> => {
	if (submitting) {
		return
	}

	try {
		setSubmitting(true)

		const res: Response = await fetch("/api/contact", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				phone,
				title,
				source,
				buttonText,
				placeholder,
				page: typeof window !== "undefined" ? window.location.pathname : "",
			}),
		})

		const data = await res.json()

		console.log("SERVER RESPONSE:", data)

		if (!res.ok || !data.ok) {
			console.error("ERROR:", data)
			return
		}

		setOpen(false)
	} catch (error) {
		console.error("REQUEST ERROR:", error)
	} finally {
		setSubmitting(false)
	}
}, [buttonText, placeholder, source, submitting, title])

	return (
		<ContactFormContext.Provider
			value={{
				openContactForm,
				closeContactForm,
			}}
		>
			{children}

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="w-[calc(100%-24px)] max-w-[560px] border-0 bg-transparent p-0 shadow-none sm:w-full">
					<DialogHeader className="sr-only">
						<DialogTitle>{title}</DialogTitle>
					</DialogHeader>

					<ContactForm
						title={title}
						buttonText={submitting ? "Отправка..." : buttonText}
						placeholder={placeholder}
						disabled={submitting}
						onSubmit={handleSubmit}
					/>
				</DialogContent>
			</Dialog>
		</ContactFormContext.Provider>
	)
}

export function useContactForm(): ContactFormContextValue {
	const context = React.useContext(ContactFormContext)

	if (!context) {
		throw new Error("useContactForm must be used within ContactFormProvider")
	}

	return context
}