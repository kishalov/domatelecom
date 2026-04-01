"use client"

import { MapPin } from "lucide-react"
import { Send, Youtube, Mail } from "lucide-react"
import Image from "next/image"
import { useCity } from "./city-provider"
import { Button } from "./ui/button"

export default function Footer() {
	const { city, openPicker } = useCity()
	
	return (
		<footer className="w-full bg-primary py-10 text-white sm:py-12 lg:py-16">
			<div className="mx-auto flex max-w-[1360px] flex-col gap-10 px-4 sm:gap-12 sm:px-6 lg:gap-16 lg:px-0">

				<div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-4 lg:gap-12">

					<Button
						type="button"
						onClick={openPicker}
						className="h-12 w-full max-w-[260px] justify-between rounded-xl bg-white px-4 py-5 text-black transition-all duration-300 hover:bg-white/80 sm:h-[50px] md:w-[200px]"
					>
						{city ? city.name : "Выбрать город"}
						<MapPin />
					</Button>

					<div className="flex flex-col gap-2 sm:gap-3">
						<p className="text-lg font-bold sm:text-xl">Основные</p>
						<a href="#" className="hover:opacity-80">Главная</a>
						<a href="#" className="hover:opacity-80">О нас</a>
						<a href="#" className="hover:opacity-80">Наши услуги</a>
						<a href="#" className="hover:opacity-80">Частые вопросы</a>
					</div>

					<div className="flex flex-col gap-2 sm:gap-3">
						<p className="text-lg font-bold sm:text-xl">Контакты</p>
						<p>doma@telecom.com</p>
						<p>8 (888) 888-88-88</p>
						<p>@domatelecom</p>
					</div>

					<div className="flex flex-col items-start gap-4 sm:gap-5">
						<Image
							src="/logo.svg"
							alt="ДомаТелеком"
							width={200}
							height={50}
							className="h-auto w-[140px] sm:w-[160px] lg:w-[200px]"
						/>

						<div className="mt-1 flex items-center gap-5 sm:mt-2 sm:gap-6">
							<Send className="h-6 w-6 cursor-pointer stroke-[1.5] hover:opacity-80 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
							<Youtube className="h-6 w-6 cursor-pointer stroke-[1.5] hover:opacity-80 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
							<Mail className="h-6 w-6 cursor-pointer stroke-[1.5] hover:opacity-80 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
						</div>
					</div>

				</div>

				<div className="flex flex-col gap-2 text-sm opacity-90 sm:gap-3 md:flex-row md:justify-between md:gap-4">
					<p>Политика конфиденциальности</p>
					<p>Согласие на обработку персональных данных</p>
					<p className="text-foreground">© Все права защищены 2025</p>
				</div>

			</div>
		</footer>
	)
}