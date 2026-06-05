

"use client"

import { Button } from "./ui/button"
import { useContactForm } from "./form-provider"

export function SpeedTestSection() {
    const { openContactForm } = useContactForm()

    return (
        <section className="w-full bg-background py-10 sm:py-16 lg:py-24">
            {/* ИСПРАВЛЕНО: lg:px-8 вместо lg:px-0 для корректных отступов на планшетах и ноутбуках */}
            <div className="mx-auto flex max-w-[1360px] flex-col gap-8 px-4 sm:gap-10 sm:px-6 lg:gap-14 lg:px-8">
                <div className="text-center">
                    <h2 className="mb-3 text-3xl font-bold leading-tight sm:mb-4 sm:text-4xl lg:text-5xl">
                        Не грузит даже мессенджер?
                    </h2>

                    <p className="mt-2 text-lg leading-relaxed sm:text-xl lg:text-2xl text-foreground/80">
                        Проверь скорость интернета прямо сейчас
                    </p>
                </div>

                <div className="flex flex-col gap-6 lg:gap-8">
                    {/* Виджет теста скорости */}
                    <div className="w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/5 border border-slate-100 bg-white">
                        <iframe
                            src="https://openspeedtest.com/speedtest"
                            className="h-[350px] w-full border-0 sm:h-[450px] lg:h-[520px]"
                            allow="fullscreen"
                        />
                    </div>

                    {/* Кнопка действия */}
                    <div className="flex justify-center">
                        <Button
                            onClick={() =>
                                openContactForm({
                                    title: "Подключим более быстрый интернет",
                                    source: "speed-test",
                                })
                            }
                            className="h-14 w-full text-base sm:h-16 sm:text-lg lg:w-fit lg:px-12 lg:text-xl rounded-2xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Подключить скорость выше
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}