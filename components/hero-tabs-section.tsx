"use client"

import * as React from "react"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { useCity } from "./city-provider"
import { useContactForm } from "./form-provider"

type TabKey = "flat" | "office" | "house"

type ProviderItem = {
	name: string
	logo: string | null
}

const TITLES: Record<TabKey, string> = {
	flat: "Домашний интернет в квартиру",
	office: "Домашний интернет для бизнеса",
	house: "Домашний интернет в частный дом",
}

const FORM_TITLES: Record<TabKey, string> = {
	flat: "Оставьте заявку на подключение домашнего интернета",
	office: "Оставьте заявку на подключение интернета для бизнеса",
	house: "Оставьте заявку на подключение интернета в частный дом",
}

function ProviderCard({
	provider,
	isActive,
}: {
	provider: ProviderItem
	isActive: boolean
}) {
	return (
		<div
			className={[
				"mx-auto flex min-h-[260px] w-full max-w-[420px] flex-col items-center justify-center rounded-[24px] bg-white px-6 py-8 transition-all duration-300 ease-out sm:min-h-[300px] sm:rounded-[28px] sm:px-8 sm:py-10 lg:min-h-[360px] lg:rounded-[32px] lg:px-10",
				isActive ? "scale-100 opacity-100" : "scale-90 opacity-80",
			].join(" ")}
		>
			<div className="relative mb-6 flex h-[96px] w-full max-w-[150px] items-center justify-center sm:mb-7 sm:h-[120px] sm:max-w-[170px] lg:mb-8 lg:h-[150px] lg:max-w-[190px]">
				{provider.logo ? (
					<Image
						src={provider.logo}
						alt={provider.name}
						width={190}
						height={150}
						className="h-auto max-h-full w-auto max-w-full object-contain"
					/>
				) : (
					<div className="text-center text-sm text-muted-foreground">
						Логотип не найден
					</div>
				)}
			</div>

			<div
				className={[
					"text-center font-bold leading-none transition-all duration-300",
					isActive ? "scale-100" : "scale-90",
				].join(" ")}
			>
				<span className="text-xl sm:text-2xl lg:text-[28px]">{provider.name}</span>
			</div>
		</div>
	)
}

export default function HeroTabsSection() {
	const [tab, setTab] = React.useState<TabKey>("flat")
	const { city, openPicker } = useCity()
	const { openContactForm } = useContactForm()

	const [providers, setProviders] = React.useState<ProviderItem[]>([])
	const [loading, setLoading] = React.useState<boolean>(false)

	const [api, setApi] = React.useState<CarouselApi | null>(null)
	const [current, setCurrent] = React.useState<number>(0)

	const openLeadForm = React.useCallback((): void => {
		openContactForm({
			title: FORM_TITLES[tab],
			source: `hero-${tab}`,
		})
	}, [openContactForm, tab])

	React.useEffect(() => {
		let alive: boolean = true

		const load = async (): Promise<void> => {
			if (!city?.name || !city?.region) {
				setProviders([])
				return
			}

			setLoading(true)

			try {
				const qs = new URLSearchParams({
					region: city.region,
					city: city.name,
				})

				const res: Response = await fetch(`/api/providers?${qs.toString()}`, {
					cache: "no-store",
				})

				if (!res.ok) {
					if (alive) {
						setProviders([])
					}
					return
				}

				const json: { providers?: ProviderItem[] } = await res.json()

				if (!alive) {
					return
				}

				setProviders(Array.isArray(json.providers) ? json.providers : [])
			} catch {
				if (alive) {
					setProviders([])
				}
			} finally {
				if (alive) {
					setLoading(false)
				}
			}
		}

		void load()

		return () => {
			alive = false
		}
	}, [city?.name, city?.region])

	React.useEffect(() => {
		if (!api) {
			return
		}

		const onSelect = (): void => {
			setCurrent(api.selectedScrollSnap())
		}

		onSelect()
		api.on("select", onSelect)
		api.on("reInit", onSelect)

		return () => {
			api.off("select", onSelect)
			api.off("reInit", onSelect)
		}
	}, [api])

	React.useEffect(() => {
		if (!api) {
			return
		}

		api.scrollTo(0, true)
		setCurrent(0)
	}, [api, providers])

	return (
		<section className="w-full py-10 sm:py-12 lg:py-16">
			<div className="mx-auto flex w-full max-w-[1360px] flex-col gap-8 px-4 sm:gap-10 sm:px-6 lg:gap-12 lg:px-8">
				<div className="flex flex-col items-center justify-center text-center">
					<h1 className="mb-3 text-3xl font-bold leading-tight sm:mb-4 sm:text-4xl lg:text-5xl">
						{TITLES[tab]}
					</h1>
					<h2 className="mt-1 max-w-5xl text-lg leading-relaxed sm:mt-2 sm:text-2xl lg:text-3xl">
						ДомаТелеком — агрегатор провайдеров по всей России. Подберем лучший тариф под твои задачи и подключим за 24 часа.
					</h2>
				</div>

				<Tabs
					value={tab}
					onValueChange={(v) => setTab(v as TabKey)}
					className="w-full items-center gap-0"
				>
					<div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-start">
						<Button
							onClick={openPicker}
							variant="secondary"
							className="w-full rounded-xl lg:w-auto"
						>
							<MapPin />
							{city ? city.name : "Выбрать город"}
						</Button>

						<div className="flex w-full items-center justify-center">
							<TabsList className="h-auto w-full gap-2 sm:grid sm:grid-cols-3 sm:w-auto">
								<TabsTrigger value="flat" className="w-full text-sm p-3 sm:px-12 sm:py-3 sm:text-xl">
									В квартиру
								</TabsTrigger>
								<TabsTrigger value="office" className="w-full text-sm p-3 sm:px-12 sm:py-3 sm:text-xl">
									В офис
								</TabsTrigger>
								<TabsTrigger value="house" className="w-full text-sm p-3 sm:px-12 sm:py-3 sm:text-xl">
									В частный дом
								</TabsTrigger>
							</TabsList>
						</div>
					</div>

					<Card className="w-full p-6">
						<CardContent className="sm:p-6">
							<TabsContent value="flat">
								<div className="w-full gap-3 grid grid-cols-2 sm:flex sm:flex-row">
									<Input
										placeholder="Улица"
										className="cursor-pointer text-base md:text-md"
										readOnly
										onClick={openLeadForm}
									/>
									<Input
										placeholder="Дом"
										className="cursor-pointer text-base md:text-md"
										readOnly
										onClick={openLeadForm}
									/>
									<Input
										placeholder="Квартира"
										className="cursor-pointer text-base md:text-md"
										readOnly
										onClick={openLeadForm}
									/>
									<Button
										className="w-full rounded-xl text-base md:text-md lg:w-auto"
										type="button"
										onClick={openLeadForm}
									>
										Найти
									</Button>
								</div>
							</TabsContent>

							<TabsContent value="office">
								<div className="flex w-full flex-col gap-3 lg:flex-row">
									<Input
										placeholder="Улица"
										className="cursor-pointer text-base md:text-md"
										readOnly
										onClick={openLeadForm}
									/>
									<Input
										placeholder="Дом"
										className="cursor-pointer text-base md:text-md"
										readOnly
										onClick={openLeadForm}
									/>
									<Input
										placeholder="Офис"
										className="cursor-pointer text-base md:text-md"
										readOnly
										onClick={openLeadForm}
									/>
									<Button
										className="w-full rounded-xl text-base md:text-md lg:w-auto"
										type="button"
										onClick={openLeadForm}
									>
										Найти
									</Button>
								</div>
							</TabsContent>

							<TabsContent value="house">
								<div className="flex w-full flex-col gap-3 lg:flex-row">
									<Input
										placeholder="Улица"
										className="cursor-pointer text-base md:text-md"
										readOnly
										onClick={openLeadForm}
									/>
									<Input
										placeholder="Дом"
										className="cursor-pointer text-base md:text-md"
										readOnly
										onClick={openLeadForm}
									/>
									<Button
										className="w-full rounded-xl text-base md:text-md lg:w-auto"
										type="button"
										onClick={openLeadForm}
									>
										Найти
									</Button>
								</div>
							</TabsContent>
						</CardContent>
					</Card>
				</Tabs>

				<div className="w-full">
					<h2 className="mb-8 text-center text-3xl font-bold leading-tight sm:mb-10 sm:text-4xl lg:mb-12 lg:text-5xl">
						Лучшие провайдеры в {city?.name ? `г. ${city.name}` : "вашем городе"}
					</h2>

					{loading ? (
						<div className="text-center text-sm text-muted-foreground">
							Загружаем провайдеров…
						</div>
					) : providers.length === 0 ? (
						<div className="text-center text-sm text-muted-foreground">
							{city
								? "Для выбранного города провайдеры не найдены."
								: "Выберите город, чтобы показать провайдеров."}
						</div>
					) : (
						<Carousel
							setApi={setApi}
							opts={{
								align: "center",
								loop: providers.length > 3,
							}}
							className="w-full"
						>
							<CarouselContent className="-ml-3 items-center sm:-ml-4 lg:-ml-6">
								{providers.map((provider, index) => {
									const isActive: boolean = index === current

									return (
										<CarouselItem
											key={provider.name}
											className="basis-full pl-3 sm:basis-1/2 sm:pl-4 lg:basis-1/3 lg:pl-6"
										>
											<div className="flex items-center justify-center">
												<ProviderCard provider={provider} isActive={isActive} />
											</div>
										</CarouselItem>
									)
								})}
							</CarouselContent>

							<div className="mt-5 flex items-center justify-center gap-3 sm:mt-6 sm:gap-5">
								<CarouselPrevious className="static h-10 w-10 translate-y-0 rounded-full border-0 bg-primary text-primary-foreground hover:bg-primary/90 sm:h-12 sm:w-12" />

								<div className="flex items-center gap-2 sm:gap-3">
									{providers.map((_, index) => {
										const isActive: boolean = index === current

										return (
											<button
												key={index}
												type="button"
												aria-label={`Перейти к карточке ${index + 1}`}
												onClick={() => api?.scrollTo(index)}
												className={[
													"h-2.5 w-2.5 rounded-full transition-all duration-200",
													isActive
														? "scale-150 bg-primary sm:scale-200"
														: "bg-white hover:bg-white",
												].join(" ")}
											/>
										)
									})}
								</div>

								<CarouselNext className="static h-10 w-10 translate-y-0 rounded-full border-0 bg-primary text-primary-foreground hover:bg-primary/90 sm:h-12 sm:w-12" />
							</div>
						</Carousel>
					)}
				</div>
			</div>
		</section>
	)
}