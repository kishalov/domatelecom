"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type CheckboxOtherProps = {
	id: string
	label: string
	placeholder?: string
	className?: string
	checked: boolean
	value: string
	onCheckedChange: (checked: boolean) => void
	onValueChange: (value: string) => void
}

export function CheckboxOther({
	id,
	label,
	placeholder = "",
	className,
	checked,
	value,
	onCheckedChange,
	onValueChange,
}: CheckboxOtherProps) {
	return (
		<div className={cn("flex flex-col gap-2", className)}>
			<div className="flex items-center gap-2">
				<Checkbox
					id={id}
					checked={checked}
					onCheckedChange={(v) => onCheckedChange(v === true)}
				/>
				<Label
					htmlFor={id}
					className="cursor-pointer whitespace-nowrap"
				>
					{label}
				</Label>
			</div>

			{checked && (
				<input
					type="text"
					value={value}
					onChange={(e) => onValueChange(e.target.value)}
					placeholder={placeholder}
					className="
						border-b border-gray-400
						focus:outline-none
						pl-1 pt-1
						w-[200px]
					"
				/>
			)}
		</div>
	)
}