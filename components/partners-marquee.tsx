"use client"

import Marquee from "react-fast-marquee"
import { Card } from "./ui/card"

export function PartnersMarquee() {
	return (
		<section className="w-full py-10 sm:py-12 lg:py-16">
			<div className="mx-auto mb-8 max-w-[1360px] px-4 sm:mb-10 lg:mb-14">
				<h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
					Наши партнёры:
				</h2>
			</div>

			<Marquee
				speed={40}
				gradient={false}
				pauseOnHover={true}
				className="w-full"
			>
				<div className="flex items-center">
					<Card className="mr-4 flex h-[120px] w-[240px] shrink-0 items-center justify-center sm:mr-6 sm:h-[150px] sm:w-[300px] lg:mr-12 lg:h-[200px] lg:w-[400px]">
						<img
							src="/partners/mts.png"
							alt="Тарифы провайдера МТС - подбор и консультация"
							className="max-h-[70%] max-w-[70%] object-contain"
						/>
					</Card>

					<Card className="mr-4 flex h-[120px] w-[240px] shrink-0 items-center justify-center sm:mr-6 sm:h-[150px] sm:w-[300px] lg:mr-12 lg:h-[200px] lg:w-[400px]">
						<img
							src="/partners/bilain.png"
							alt="Тарифы провайдера Билайн - подбор и консультация"
							className="max-h-[70%] max-w-[70%] object-contain"
						/>
					</Card>

					<Card className="mr-4 flex h-[120px] w-[240px] shrink-0 items-center justify-center sm:mr-6 sm:h-[150px] sm:w-[300px] lg:mr-12 lg:h-[200px] lg:w-[400px]">
						<img
							src="/partners/rostelecom.png"
							alt="Тарифы провайдера Ростелеком - подбор и консультация"
							className="max-h-[70%] max-w-[70%] object-contain"
						/>
					</Card>

					<Card className="mr-4 flex h-[120px] w-[240px] shrink-0 items-center justify-center sm:mr-6 sm:h-[150px] sm:w-[300px] lg:mr-12 lg:h-[200px] lg:w-[400px]">
						<img
							src="/partners/ufanet.png"
							alt="Тарифы провайдера Уфанет - подбор и консультация"
							className="max-h-[70%] max-w-[70%] object-contain"
						/>
					</Card>

					<Card className="mr-4 flex h-[120px] w-[240px] shrink-0 items-center justify-center sm:mr-6 sm:h-[150px] sm:w-[300px] lg:mr-12 lg:h-[200px] lg:w-[400px]">
						<img
							src="/partners/mts.png"
							alt="Тарифы провайдера МТС - подбор и консультация"
							className="max-h-[70%] max-w-[70%] object-contain"
						/>
					</Card>

					<Card className="mr-4 flex h-[120px] w-[240px] shrink-0 items-center justify-center sm:mr-6 sm:h-[150px] sm:w-[300px] lg:mr-12 lg:h-[200px] lg:w-[400px]">
						<img
							src="/partners/bilain.png"
							alt="Тарифы провайдера Билайн - подбор и консультация"
							className="max-h-[70%] max-w-[70%] object-contain"
						/>
					</Card>

					<Card className="mr-4 flex h-[120px] w-[240px] shrink-0 items-center justify-center sm:mr-6 sm:h-[150px] sm:w-[300px] lg:mr-12 lg:h-[200px] lg:w-[400px]">
						<img
							src="/partners/rostelecom.png"
							alt="Тарифы провайдера Ростелеком - подбор и консультация"
							className="max-h-[70%] max-w-[70%] object-contain"
						/>
					</Card>

					<Card className="mr-4 flex h-[120px] w-[240px] shrink-0 items-center justify-center sm:mr-6 sm:h-[150px] sm:w-[300px] lg:mr-12 lg:h-[200px] lg:w-[400px]">
						<img
							src="/partners/ufanet.png"
							alt="Тарифы провайдера Уфанет - подбор и консультация"
							className="max-h-[70%] max-w-[70%] object-contain"
						/>
					</Card>
				</div>
			</Marquee>
		</section>
	)
}