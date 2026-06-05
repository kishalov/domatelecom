"use client"

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { ContactForm } from "./form"

type ContactFormDialogProps = {
	open: boolean
	title: string
	buttonText: string
	placeholder: string
	disabled: boolean
	onOpenChange: (open: boolean) => void
	onSubmit: (phone: string) => void | Promise<void>
}

export function ContactFormDialog({
	open,
	title,
	buttonText,
	placeholder,
	disabled,
	onOpenChange,
	onSubmit,
}: ContactFormDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="w-[calc(100%-24px)] max-w-[560px] border-0 bg-transparent p-0 shadow-none sm:w-full">
				<DialogHeader className="sr-only">
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>

				<ContactForm
					title={title}
					buttonText={buttonText}
					placeholder={placeholder}
					disabled={disabled}
					onSubmit={onSubmit}
				/>
			</DialogContent>
		</Dialog>
	)
}
