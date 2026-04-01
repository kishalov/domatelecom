"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function DigitRoller({ value }: { value: number | string }) {
	const [display, setDisplay] = useState<number | string>(value)

	useEffect(() => {
		setDisplay(value)
	}, [value])

	return (
		<span className="relative inline-block overflow-hidden h-[1em] leading-none w-[0.6em] text-center align-baseline">
			<AnimatePresence mode="wait">
				<motion.span
					key={String(display)}
					initial={{ y: "-100%", opacity: 1 }}
					animate={{ y: "0%", opacity: 1 }}
					exit={{ y: "100%", opacity: 1 }}
					transition={{ duration: 0.18, ease: "easeOut" }}
					className="absolute inset-0 inline-block"
				>
					{display}
				</motion.span>
			</AnimatePresence>
		</span>
	)
}