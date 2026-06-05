"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function ExtraServicesSection() {
    return (
        <section id="services" className="w-full py-10 sm:py-14 lg:py-20 overflow-hidden">
            <div className="mx-auto flex max-w-[1360px] flex-col gap-8 px-4 sm:gap-10 sm:px-6 lg:gap-12">
                <h2 className="text-center text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                    Что еще можем подключить кроме интернета
                </h2>

                {/* Убрали фиксированную ширину у контейнера и карточек. 
                    Используем адаптивный gap для промежуточных размеров */}
                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:gap-10">
                    
                    <Card className="relative h-[240px] w-full overflow-hidden bg-primary p-0 text-white sm:h-[270px] lg:h-[300px]">
                        <CardContent className="relative h-full w-full p-6 sm:p-8">
                            <p className="text-xl font-bold sm:text-2xl">
                                Домофония
                            </p>
                            <Image
                                src="/domofon.png"
                                alt="Домофония от провайдеров-партнеров"
                                width={400}
                                height={200}
                                className="absolute bottom-0 left-1/2 w-[75%] sm:w-[70%] lg:w-[80%] -translate-x-1/2 object-contain"
                            />
                        </CardContent>
                    </Card>

                    <Card className="relative h-[240px] w-full bg-primary p-0 text-white sm:h-[270px] lg:h-[300px]">
                        <CardContent className="relative flex h-full w-full flex-col p-6 sm:p-8">
                            <p className="text-xl font-bold sm:text-2xl">
                                Мобильная связь
                            </p>
                            <Image
                                src="/mobile.svg"
                                alt="Мобильная связь от провайдеров-партнеров"
                                width={260}
                                height={260}
                                className="absolute -bottom-4 left-1/2 w-32 sm:w-36 lg:w-44 -translate-x-1/2"
                            />
                        </CardContent>
                    </Card>

                    <Card className="relative h-[240px] w-full bg-primary p-0 text-white sm:h-[270px] lg:h-[300px]">
                        <CardContent className="relative h-full w-full p-6 sm:p-8">
                            <p className="text-xl font-bold sm:text-2xl">
                                Цифровое и кабельное ТВ
                            </p>
                            <Image
                                src="/tv.svg"
                                alt="Цифровое и кабельное телевидение от провайдеров-партнеров"
                                width={300}
                                height={200}
                                className="absolute -bottom-4 left-1/2 w-48 sm:w-56 lg:w-64 -translate-x-1/2"
                            />
                        </CardContent>
                    </Card>

                    {/* КАРТОЧКА 4: Видеонаблюдение */}
                    <Card className="relative h-[240px] w-full overflow-hidden border-0 sm:h-[270px] lg:h-[300px]">
                        {/* 1. ФОН (Background) */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="/cameras-bg.png"
                                alt="Видеонаблюдение от провайдеров-партнеров"
                                fill
                                sizes="100vw"
                                className="object-cover"
                            />
                        </div>

                        {/* 2. ПЛАВАЮЩЕЕ ИЗОБРАЖЕНИЕ (Cameras Image) */}
                        <div className="absolute -bottom-10 right-0 z-10 h-full w-1/2">
                            <Image
                                src="/cameras.png"
                                alt="Видеонаблюдение от провайдеров-партнеров"
                                fill
                                sizes="(min-width: 1024px) 50vw, 50vw"
                                className="object-contain object-right-bottom" 
                            />
                        </div>

                        {/* 3. КОНТЕНТ (Текст поверх всего) */}
                        <CardContent className="relative z-20 h-full">
                            <p className="text-xl font-bold text-black sm:text-2xl">
                                Видеонаблюдение
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="relative h-[240px] w-full overflow-hidden bg-[#001D3D] text-white sm:h-[270px] lg:h-[300px]">
                        <CardContent className="relative h-full w-full p-6 sm:p-8">
                            <p className="text-xl font-bold sm:text-2xl">
                                Онлайн-кинотеатры
                            </p>
                            <Image
                                src="/cinema-logos.svg"
                                alt="Онлайн-кинотеатры от провайдеров-партнеров"
                                width={200}
                                height={100}
                                className="absolute bottom-1 right-4 w-36 sm:w-34 lg:w-45"
                            />
                        </CardContent>
                    </Card>

                    <Card className="relative h-[240px] w-full overflow-hidden bg-[#001D3D] text-white sm:h-[270px] lg:h-[300px]">
                        <CardContent className="flex h-full flex-col justify-between p-6 sm:p-8">
                            <p className="text-xl font-bold sm:text-2xl">Бонусы от партнёров</p>
                            <div className="text-base leading-snug opacity-90 sm:text-lg">
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