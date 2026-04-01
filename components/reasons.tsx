"use client"

import Image from "next/image"

export function ReasonsSection() {
	return (
		<section className="relative w-full overflow-hidden bg-background py-10 sm:py-14 lg:py-20">
			<div className="relative z-10 mx-auto flex max-w-[1360px] flex-col gap-8 px-4 sm:gap-10 sm:px-6 lg:flex-row lg:gap-12 lg:px-0">
				<div className="flex-1">
					<h2 className="mb-6 text-3xl font-bold leading-tight sm:mb-8 sm:text-4xl lg:mb-10 lg:text-5xl">
						Рейтинг интернет провайдеров не главное и вот почему
					</h2>

					<div className="flex flex-col gap-6 text-base sm:gap-8 sm:text-lg lg:gap-10">
						<div className="flex items-start gap-3 sm:gap-4">
							<span className="text-primary text-4xl leading-none sm:text-5xl lg:text-6xl">•</span>
							<div>
								<p className="font-bold">Локальные особенности</p>
								<p className="mt-1">
									Качество интернета зависит не только от самого провайдера,
									но и от географического расположения. В разных районах города
									уровень развития инфраструктуры может сильно отличаться. Добавим
									сюда также качество кабелей, количество пользователей в сети
									и другие факторы, которые влияют на скорость и стабильность
									домашнего интернета и телевидения.
								</p>
							</div>
						</div>

						<div className="flex items-start gap-3 sm:gap-4">
							<span className="text-primary text-4xl leading-none sm:text-5xl lg:text-6xl">•</span>
							<div>
								<p className="font-bold">Тип подключения</p>
								<p className="mt-1">
									Провайдер может предлагать различные технологии подключения
									(GPON, ADSL, FTTB и т.д.). В зависимости от твоего района,
									один тип подключения может быть более эффективным и надежным,
									чем другой. ДомаТелеком всегда подскажет, какой тип подключения
									в выбранном тобой тарифе.
								</p>
							</div>
						</div>

						<div className="flex items-start gap-3 sm:gap-4">
							<span className="text-primary text-4xl leading-none sm:text-5xl lg:text-6xl">•</span>
							<div>
								<p className="font-bold">Изменения в обслуживании</p>
								<p className="mt-1">
									Рейтинг провайдера может меняться со временем. Обновили кабеля,
									модернизировали сеть, обновили условия тарифов, изменили работу
									технической поддержки клиентов — все это влияет на общую картину
									работы каждого провайдера России.
								</p>
							</div>
						</div>

						<div className="flex items-start gap-3 sm:gap-4">
							<span className="text-primary text-4xl leading-none sm:text-5xl lg:text-6xl">•</span>
							<div>
								<p className="font-bold">Персональные предпочтения</p>
								<p className="mt-1">
									У каждого пользователя разные цели при использовании домашнего
									интернета: кому-то просто нужен доступ до мессенджеров, а кому-то
									нужно выиграть турнир в онлайн-игре. То, что подходит одному
									пользователю, не всегда будет хорошо работать для другого,
									но ДомаТелеком точно знает, какой тариф тебе предложить, чтобы
									все твои задачи выполнялись без проблем.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="relative min-h-[220px] flex-1 pointer-events-none select-none sm:min-h-[300px] lg:min-h-0">
					<div className="absolute inset-0 flex items-center justify-center lg:inset-y-0 lg:-right-100 lg:justify-end">
						<Image
							src="/globe-right.svg"
							alt=""
							width={1200}
							height={1200}
							className="h-auto w-full max-w-[320px] object-contain sm:max-w-[480px] lg:h-full lg:max-w-none lg:w-auto"
						/>
					</div>
				</div>
			</div>
		</section>
	)
}