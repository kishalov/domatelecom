"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "./ui/card"
import { useContactForm } from "./form-provider"

export default function AboutSection() {
	const { openContactForm } = useContactForm()

	return (
		<section
		id="about"
			className="bg-secondary py-10 md:py-12 lg:py-0"
			style={{
				backgroundImage: "url('/cable-bg.svg')",
				backgroundSize: "contain",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className="mx-auto flex max-w-[1360px] flex-col px-4 sm:px-6 lg:px-0">
				<div className="flex flex-col gap-6">
					<h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
						С нами все онлайн
					</h2>

					<div className="flex flex-col gap-6 md:flex-row md:gap-12">
						<p className="text-base leading-relaxed sm:text-lg">
							Не разбираешься в тарифах? <br />
							Мы поможем выбрать провайдера и предложение — просто заполни анкету
						</p>

						<Button
							type="button"
							onClick={() =>
								openContactForm({
									title: "Оставьте заявку на подбор провайдера",
									source: "about-section",
								})
							}
							className="w-full rounded-xl text-md sm:w-fit md:w-auto"
						>
							Заполнить
						</Button>
					</div>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 items-center gap-6 sm:gap-8 lg:gap-10 mt-8 lg:mt-0">
					<Image
						src="/about-1.png"
						alt=""
						width={300}
						height={300}
						className="w-full h-auto"
					/>

					<Card className="relative overflow-visible scale-100 lg:scale-110 p-5 sm:p-6">
						<h3 className="text-xl sm:text-2xl font-bold w-[80%]">
							Эксперты в подборе оборудования
						</h3>
						<p className="text-base sm:text-lg w-[80%] text-foreground/80 leading-relaxed">
							Расскажем о плюсах и минусах роутеров и подберем лучший вариант
						</p>

						<Image
							src="/router.png"
							alt=""
							width={140}
							height={140}
							className="absolute pointer-events-none w-[90px] sm:w-[110px] lg:w-[140px] -top-4 right-0 sm:-top-6 sm:-right-2 lg:-top-10 lg:-right-6"
						/>
					</Card>

					<Image
						src="/about-2.png"
						alt=""
						width={300}
						height={300}
						className="w-full h-auto"
					/>

					<div className="relative bg-white rounded-xl p-5 sm:p-6 flex flex-col gap-3 shadow-sm overflow-visible">
						<h3 className="text-xl sm:text-2xl font-bold w-[80%]">
							Говорим с тобой на одном языке
						</h3>
						<p className="text-base sm:text-lg w-[80%] text-foreground/80 leading-relaxed">
							Не работает интернет? Высокий пинг в играх? Мы знаем, что это такое и как бороться
						</p>

						<Image
							src="/code.png"
							alt=""
							width={160}
							height={160}
							className="absolute pointer-events-none w-[100px] sm:w-[130px] lg:w-[160px] -bottom-6 right-0 sm:-bottom-8 sm:-right-4 lg:-bottom-17 lg:-right-10"
						/>
					</div>

					<Image
						src="/about-3.png"
						alt=""
						width={1000}
						height={160}
						className="w-full h-auto"
					/>

					<div className="relative bg-white rounded-xl p-5 sm:p-6 flex flex-col gap-3 shadow-sm overflow-visible">
						<h3 className="text-xl sm:text-2xl w-[80%] font-bold">
							С нами сменить провайдера — просто
						</h3>
						<p className="text-base sm:text-lg w-[80%] text-foreground/80 leading-relaxed">
							Подберем интернет-провайдера и тариф со стабильной скоростью и без неприятных сюрпризов
						</p>

						<Image
							src="/cursor.png"
							alt=""
							width={160}
							height={80}
							className="absolute pointer-events-none w-[100px] sm:w-[130px] lg:w-[160px] -bottom-6 right-0 sm:-bottom-8 sm:-right-4 lg:-bottom-17 lg:-right-10"
						/>
					</div>
				</div>
			</div>
		</section>
	)
}