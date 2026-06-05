"use client"

import React, { useEffect, useRef, useState } from "react"

type SpeedometerProps = {
	value: number
}

export default function Speedometer({ value }: SpeedometerProps) {
		const clamped = Math.min(100, Math.max(0, value))

	const [animatedValue, setAnimatedValue] = useState<number>(clamped)

	const valueRef = useRef<number>(clamped)
	const velocityRef = useRef<number>(0)
	const frameRef = useRef<number | null>(null)
	const lastTimeRef = useRef<number | null>(null)

	useEffect(() => {
		lastTimeRef.current = null

		if (frameRef.current !== null) {
			cancelAnimationFrame(frameRef.current)
		}

		const target = clamped

		function step(timestamp: number) {
			if (lastTimeRef.current === null) {
				lastTimeRef.current = timestamp
				frameRef.current = requestAnimationFrame(step)
				return
			}

			const dt = (timestamp - lastTimeRef.current) / 1000
			lastTimeRef.current = timestamp

			const stiffness = 60
			const damping = 12

			let x = valueRef.current
			let v = velocityRef.current

			const force = -stiffness * (x - target) - damping * v
			const accel = force

			v += accel * dt
			x += v * dt

			velocityRef.current = v
			valueRef.current = x
			setAnimatedValue(x)

			if (Math.abs(v) < 0.01 && Math.abs(x - target) < 0.1) {
				setAnimatedValue(target)
				valueRef.current = target
				velocityRef.current = 0
				frameRef.current = null
				return
			}

			frameRef.current = requestAnimationFrame(step)
		}

		frameRef.current = requestAnimationFrame(step)

		return () => {
			if (frameRef.current !== null) {
				cancelAnimationFrame(frameRef.current)
			}
			frameRef.current = null
		}
	}, [clamped])

	const START_ANGLE = 180
	const END_ANGLE = 0

	const ticks = [20, 40, 60, 80]

	function percentToAngle(p: number) {
		return START_ANGLE + ((END_ANGLE - START_ANGLE) * p) / 100
	}

	function polarToCartesian(angleDeg: number, radius: number) {
		const rad = (angleDeg * Math.PI) / 180
		return {
			x: 50 + radius * Math.cos(rad),
			y: 50 - radius * Math.sin(rad),
		}
	}

	const angle = percentToAngle(animatedValue)
	const needleEnd = polarToCartesian(angle, 34)

	return (
		<div className="relative w-[340px] h-[340px]">
			<svg width="100%" height="100%" viewBox="0 0 100 100">
				<circle
					cx="50"
					cy="50"
					r="40"
					fill="none"
					stroke="#C9D1FF"
					strokeWidth="8"
					strokeLinecap="round"
				/>

				<path
					d="
						M 10 50
						A 40 40 0 0 1 90 50
					"
					fill="none"
					stroke="#495FCD"
					strokeWidth="8"
					strokeLinecap="round"
				/>

				{ticks.map((p, idx) => {
					const a = percentToAngle(p)
					const i = polarToCartesian(a, 34)
					const o = polarToCartesian(a, 40)
					return (
						<line
							key={idx}
							x1={i.x}
							y1={i.y}
							x2={o.x}
							y2={o.y}
							stroke="#000"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					)
				})}

				<circle cx="50" cy="50" r="8" fill="#C9D1FF" />

				<line
					x1={50}
					y1={50}
					x2={needleEnd.x}
					y2={needleEnd.y}
					stroke="#EAF0FF"
					strokeWidth="4"
					strokeLinecap="round"
				/>
			</svg>
		</div>
	)
}
