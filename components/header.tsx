"use client"

import Image from "next/image"
import Link from "next/link"
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { Mail, Menu, Send, Youtube } from "lucide-react"
import { useCity } from "./city-provider"

export default function Header() {
	const { city, openPicker } = useCity()

	return (
		<header className="w-full">
			<div className="mx-auto flex max-w-[1360px] items-center justify-between p-4">
				<Link
					href="/"
					className="flex items-center gap-3 transition-transform duration-500 hover:scale-105"
				>
					<Image
						src="/logo.svg"
						alt="Подключение домашнего интернета и ТВ по всей России с ДомаТелеком"
						width={250}
						height={32}
						className="h-auto w-[180px] sm:w-[220px] lg:w-[250px]"
					/>
				</Link>

				<nav className="hidden md:flex">
					<NavigationMenu>
						<NavigationMenuList className="gap-8">
							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link href="#" className="text-xl">
										Главная
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link href="#about" className="text-xl">
										О нас
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link href="#services" className="text-xl">
										Наши услуги
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link href="#faq" className="text-xl">
										Частые вопросы
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</nav>

				<div className="hidden flex-col items-end justify-between gap-3 md:flex">
					<div className="flex items-center gap-10 text-primary">
						<Link href="https://t.me/domatelecom">
							<Send className="h-7 w-7 transition-colors duration-500 hover:text-dark-blue" />
						</Link>
						<Link href="https://www.youtube.com/@Domatelecom" target="_blank">
							<Youtube className="h-7 w-7 transition-colors duration-500 hover:text-dark-blue" />
						</Link>
						<Link href="mailto:doma.telekom@yandex.ru">
							<Mail className="h-7 w-7 transition-colors duration-500 hover:text-dark-blue" />
						</Link>
					</div>

					<a href="tel:+79014175658" className="text-xl font-bold">
						8 901 417 56 58
					</a>

					<button
						type="button"
						onClick={openPicker}
						className="cursor-pointer border-none px-0 py-0 text-xl font-bold text-primary shadow-none transition-colors duration-500 hover:text-dark-blue"
					>
						{city ? `г. ${city.name}` : "Выбрать город"}
					</button>
				</div>

				<div className="md:hidden">
					<Sheet>
						<SheetTrigger asChild>
							<button
								type="button"
								aria-label="Открыть меню"
								className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-primary transition-colors duration-300 hover:bg-primary/10"
							>
								<Menu className="h-7 w-7" />
							</button>
						</SheetTrigger>

						<SheetContent side="right" className="w-[320px] border-0 bg-secondary p-6">
							<SheetHeader className="mb-8">
								<SheetTitle className="text-left text-2xl font-bold">
									Меню
								</SheetTitle>
							</SheetHeader>

							<div className="flex h-full flex-col gap-8">
								<nav className="flex flex-col gap-5">
									<Link href="#" className="text-xl font-medium">
										Главная
									</Link>
									<Link href="#about" className="text-xl font-medium">
										О нас
									</Link>
									<Link href="#services" className="text-xl font-medium">
										Наши услуги
									</Link>
									<Link href="#faq" className="text-xl font-medium">
										Частые вопросы
									</Link>
								</nav>

								<div className="flex items-center gap-6 text-primary">
									<Link href="https://t.me/domatelecom">
										<Send className="h-7 w-7 transition-colors duration-500 hover:text-dark-blue" />
									</Link>
									<Link href="https://www.youtube.com/@Domatelecom" target="_blank">
										<Youtube className="h-7 w-7 transition-colors duration-500 hover:text-dark-blue" />
									</Link>
									<Link href="mailto:doma.telekom@yandex.ru">
										<Mail className="h-7 w-7 transition-colors duration-500 hover:text-dark-blue" />
									</Link>
								</div>

								<div className="mt-auto flex flex-col gap-4">
									<a href="tel:+79014175658" className="text-xl font-bold">
										8 901 417 56 58
									</a>

									<button
										type="button"
										onClick={openPicker}
										className="w-fit cursor-pointer border-none px-0 py-0 text-left text-xl font-bold text-primary shadow-none transition-colors duration-500 hover:text-dark-blue"
									>
										{city ? `г. ${city.name}` : "Выбрать город"}
									</button>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	)
}