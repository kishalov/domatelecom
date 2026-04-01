"use client"

import { Button } from "./ui/button"
import { useContactForm } from "./form-provider"

export function SpeedTestSection() {
	const { openContactForm } = useContactForm()

	return (
		<section className="w-full bg-background py-10 sm:py-12 lg:py-16">
			<div className="mx-auto flex max-w-[1360px] flex-col gap-8 px-4 sm:gap-10 sm:px-6 lg:gap-12 lg:px-0">
				<div className="text-center">
					<h2 className="mb-3 text-3xl font-bold leading-tight sm:mb-4 sm:text-4xl lg:text-5xl">
						Не грузит даже мессенджер?
					</h2>

					<p className="mt-2 text-lg leading-relaxed sm:text-2xl lg:text-3xl">
						Проверь скорость интернета прямо сейчас
					</p>
				</div>

				<div className="flex flex-col gap-4">
					<div className="w-full overflow-hidden rounded-2xl shadow-xl">
						<iframe
							src="https://openspeedtest.com/speedtest"
							className="h-[320px] w-full border-0 sm:h-[400px] lg:h-[480px]"
							allow="fullscreen"
						/>
					</div>

					<Button
						onClick={() =>
							openContactForm({
								title: "Подключим более быстрый интернет",
								source: "speed-test",
							})
						}
						className="h-12 w-full text-base sm:h-14 sm:text-lg lg:h-15 lg:text-xl"
					>
						Подключить скорость выше
					</Button>
				</div>
			</div>
		</section>
	)
}