"use client"

import { DigitRoller } from "./digit-roller"

export default function DoubleDigitRoller(props: { value: number }) {
	const str: string = String(props.value).padStart(2, "0")

	return (
		<span className="inline-flex gap-[2px] align-baseline">
			<DigitRoller value={str[0]} />
			<DigitRoller value={str[1]} />
		</span>
	)
}