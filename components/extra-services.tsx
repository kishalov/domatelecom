"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function ExtraServicesSection() {
	return (
		<section id="services" className="w-full bg-secondary py-10 sm:py-14 lg:py-20">
			<div className="mx-auto flex max-w-[1360px] flex-col gap-8 px-4 sm:gap-10 sm:px-6 lg:gap-12 lg:px-0">
				<h2 className="text-center text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
					Что еще можем подключить кроме интернета
				</h2>

				<div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
					<Card className="h-[240px] w-full overflow-hidden bg-primary p-0 text-white sm:h-[270px] lg:h-[300px] lg:w-[430px]">
						<CardContent className="relative h-full w-full">
							<p className="p-6 text-xl font-bold sm:p-8 sm:text-2xl lg:p-12">
								Домофония
							</p>

							<Image
								src="/domofon.png"
								alt="Домофония"
								width={400}
								height={200}
								className="absolute bottom-0 left-1/2 w-56 -translate-x-1/2 sm:w-64 lg:w-80"
							/>
						</CardContent>
					</Card>

					<Card className="h-[240px] w-full bg-primary p-0 text-white sm:h-[270px] lg:h-[300px] lg:w-[430px]">
						<CardContent className="relative flex h-full w-full flex-col">
							<p className="p-6 text-xl font-bold sm:p-8 sm:text-2xl lg:p-12">
								Мобильная связь
							</p>

							<Image
								src="/mobile.svg"
								alt="Мобильная связь"
								width={260}
								height={260}
								className="absolute -bottom-4 left-1/2 w-28 -translate-x-1/2 sm:-bottom-5 sm:w-32 lg:-bottom-7 lg:w-40"
							/>
						</CardContent>
					</Card>

					<Card className="h-[240px] w-full bg-primary p-0 text-white sm:h-[270px] lg:h-[300px] lg:w-[430px]">
						<CardContent className="relative h-full w-full p-6 sm:p-8 lg:p-6">
							<p className="text-xl font-bold sm:text-2xl">
								Цифровое и кабельное ТВ
							</p>

							<Image
								src="/tv.svg"
								alt="Все виды ТВ"
								width={300}
								height={200}
								className="absolute -bottom-4 left-1/2 w-44 -translate-x-1/2 sm:-bottom-5 sm:w-52 lg:-bottom-7 lg:w-60"
							/>
						</CardContent>
					</Card>

					<Card className="relative h-[240px] w-full overflow-hidden sm:h-[270px] lg:h-[300px] lg:w-[430px]">
						<div className="absolute inset-0">
							<Image
								src="/cameras-bg.png"
								alt="Камеры"
								fill
								className="object-cover"
							/>
						</div>
						<CardContent className="relative p-6 sm:p-8 lg:p-6">
							<p className="text-xl font-bold text-black sm:text-2xl">
								Видеонаблюдение
							</p>
						</CardContent>
					</Card>

					<Card className="h-[240px] w-full overflow-hidden bg-dark-blue text-white sm:h-[270px] lg:h-[300px] lg:w-[430px]">
						<CardContent className="relative h-full w-full p-6 sm:p-8 lg:p-6">
							<p className="text-xl font-bold sm:text-2xl">
								Онлайн-кинотеатры
							</p>

							<Image
								src="/cinema-logos.svg"
								alt="Онлайн кинотеатры"
								width={200}
								height={100}
								className="absolute bottom-0 right-0 w-32 sm:w-40 lg:w-auto"
							/>
						</CardContent>
					</Card>

					<Card className="h-[240px] w-full overflow-hidden bg-dark-blue text-white sm:h-[270px] lg:h-[300px] lg:w-[430px]">
						<CardContent className="flex h-full flex-col gap-4 p-6 sm:p-8 lg:p-6">
							<p className="text-xl font-bold sm:text-2xl">Бонусы от партнёров</p>

							<div className="mt-auto text-base leading-snug opacity-90 sm:text-lg">
								<p>Подписки</p>
								<p>Промокоды</p>
								<p>И многое другое</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	)
}