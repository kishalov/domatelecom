"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function EndScrollSection() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <section className="w-full pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-60 lg:pb-24">
            {/* ИСПРАВЛЕНО: lg:px-8 вместо lg:px-0 для боковых отступов на планшетах/маленьких ноутбуках */}
            <div className="relative mx-auto flex max-w-[1360px] flex-col items-center px-4 sm:px-6 lg:px-8">
                <Card className="relative w-full pt-20 sm:pt-24 lg:pt-30">
                    
                    <div className="absolute inset-x-0 top-0 flex -translate-y-[40%] justify-center sm:-translate-y-[45%] lg:-translate-y-[50%]">
                        <Image
                            src="/cat-end.svg"
                            alt="Маскот ДомаТелеком - подключение интернета и тв"
                            width={240}
                            height={240}
                            className="h-auto w-[140px] object-contain sm:w-[180px] lg:w-[240px]"
                        />
                    </div>

                    {/* Оставляем оригинальные отступы контента без добавочного pb */}
                    <CardContent className="flex flex-col items-center gap-3 text-center sm:gap-4">
                        <h2 className="text-3xl font-bold leading-tight sm:text-5xl lg:text-7xl">
                            Долистал до конца?
                        </h2>

                        <p className="text-lg sm:text-xl lg:text-2xl">
                            Вот тебе милый котик!
                        </p>

                        <Button
                            onClick={scrollToTop}
                            className="mt-4 w-full max-w-[280px] px-6 py-4 text-base sm:w-auto sm:px-8 sm:py-5 sm:text-lg lg:px-10 lg:py-6"
                        >
                            Вернуться в начало
                        </Button>
                    </CardContent>

                </Card>
            </div>
        </section>
    )
}