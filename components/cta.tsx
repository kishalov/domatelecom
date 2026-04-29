"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import DoubleDigitRoller from "./double-digit-roller"
import { useContactForm } from "./form-provider"

export function CtaPromoSection() {
    const INITIAL = 15 * 24 * 60 * 60
    const [secondsLeft, setSecondsLeft] = useState(INITIAL)

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft((prev) => (prev <= 1 ? INITIAL : prev - 1))
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const days = Math.floor(secondsLeft / 86400)
    const hours = Math.floor((secondsLeft % 86400) / 3600)
    const minutes = Math.floor((secondsLeft % 3600) / 60)
    const seconds = secondsLeft % 60
    const { openContactForm } = useContactForm()

    return (
        <section className="w-full bg-background py-10 sm:py-12 lg:py-16">
            {/* ИЗМЕНЕНО: только lg:px-8 для безопасных отступов по бокам */}
            <div className="mx-auto flex max-w-[1360px] flex-col gap-4 px-4 sm:gap-5 sm:px-6 lg:flex-row lg:items-stretch lg:gap-6 lg:px-8">
                <Card className="flex-1 bg-primary text-primary-foreground overflow-hidden p-0 h-fit lg:h-auto">
  <CardContent className="flex h-full flex-col p-0 sm:flex-row relative">
    {/* Текстовый контент */}
    <div className="z-10 flex flex-col justify-center gap-3 px-5 pt-6 sm:gap-4 sm:px-8 sm:py-8 lg:pl-12">
      <p className="text-5xl font-bold leading-none sm:text-6xl lg:text-8xl">
        0 руб*
      </p>
      <p className="text-lg leading-snug sm:text-xl lg:text-2xl">
        на 1 месяц
        <br />
        при подключении
        <br />
        интернета+ТВ
      </p>
      <p className="text-xs opacity-80">*для новых абонентов</p>
    </div>

    {/* Контейнер с котом и кругом */}
    <div className="relative ml-auto flex flex-col h-[300px] sm:flex-row items-end justify-center px-4 pb-0 pt-4 sm:px-0 sm:w-1/2 lg:w-[45%]">
      <div 
        className="absolute sm:right-[-10%] aspect-square w-[400px] right-[-50%] -bottom-1/2 rounded-full bg-[#CBCFFF] sm:w-[180%] sm:-bottom-[90%] sm:right-[-50%]" 
        aria-hidden="true"
      />

      <img
        src="/cta-cat-transparent.png" 
        alt="Маскот ДомаТелеком"
        className="absolute min-w-[350px] bottom-[-50%] right-0 sm:bottom-[-120%] sm:right-[5%] sm:min-w-[500px]"
      />
    </div>
  </CardContent>
</Card>

                <Card className="bg-muted h-fit lg:h-auto">
                    <CardContent className="h-full flex flex-col justify-between p-5 sm:p-6">
                        <div className="flex flex-col gap-4">
                            <p className="text-xl font-bold sm:text-2xl">
                                Успей подключиться
                            </p>

                            <div className="flex items-end gap-2">
                                <p className="text-5xl font-bold leading-none flex sm:text-6xl lg:text-8xl">
                                    <DoubleDigitRoller value={days} />
                                </p>
                                <p className="text-sm leading-3 sm:text-base">дней</p>
                            </div>

                            <div className="flex gap-4 text-center items-baseline sm:gap-6">
                                <div>
                                    <div className="text-3xl font-light sm:text-4xl">
                                        <DoubleDigitRoller value={hours} />
                                    </div>
                                    <p className="text-sm sm:text-base">часа</p>
                                </div>

                                <div>
                                    <div className="text-3xl font-light sm:text-4xl">
                                        <DoubleDigitRoller value={minutes} />
                                    </div>
                                    <p className="text-sm sm:text-base">минут</p>
                                </div>

                                <div>
                                    <div className="text-3xl font-light sm:text-4xl">
                                        <DoubleDigitRoller value={seconds} />
                                    </div>
                                    <p className="text-sm sm:text-base">секунд</p>
                                </div>
                            </div>
                        </div>

                        <Button className="mt-6 w-full rounded-xl text-md"
                            onClick={() =>
                            openContactForm({
                                title: "Успей оставить заявку",
                                source: "speed-test",
                            })
                        }
                        >
                            Подключить
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}