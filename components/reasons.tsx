"use client"

import Image from "next/image"

export function ReasonsSection() {
    return (
        <section className="relative w-full overflow-hidden bg-background py-10 sm:py-14 lg:py-20">
            {/* ИСПРАВЛЕНО: Добавлены явные отступы px-6 и lg:px-10, чтобы текст точно не лип к краям */}
            <div className="relative z-10 mx-auto flex max-w-[1360px] flex-col gap-8 px-6 sm:px-8 lg:flex-row lg:items-stretch lg:gap-12 lg:px-10">
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
                                    уровень развития инфраструктуры может сильно отличаться.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 sm:gap-4">
                            <span className="text-primary text-4xl leading-none sm:text-5xl lg:text-6xl">•</span>
                            <div>
                                <p className="font-bold">Тип подключения</p>
                                <p className="mt-1">
                                    Провайдер может предлагать различные технологии подключения
                                    (GPON, ADSL, FTTB и т.д.). ДомаТелеком всегда подскажет, какой тип подключения
                                    в выбранном тобой тарифе.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 sm:gap-4">
                            <span className="text-primary text-4xl leading-none sm:text-5xl lg:text-6xl">•</span>
                            <div>
                                <p className="font-bold">Изменения в обслуживании</p>
                                <p className="mt-1">
                                    Рейтинг провайдера может меняться со временем. Модернизировали сеть, 
                                    обновили условия тарифов — все это влияет на общую картину.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 sm:gap-4">
                            <span className="text-primary text-4xl leading-none sm:text-5xl lg:text-6xl">•</span>
                            <div>
                                <p className="font-bold">Персональные предпочтения</p>
                                <p className="mt-1">
                                    То, что подходит одному пользователю, не всегда будет работать для другого, 
                                    но ДомаТелеком точно знает, какой тариф тебе предложить.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative hidden flex-1 pointer-events-none select-none sm:block">
                    <div className="absolute top-0 -right-100 h-full flex items-center xl:-right-60">
                        <Image
                            src="/globe-right.svg"
                            alt="Рейтинг интернет-провайдеров по России"
                            width={1200}
                            height={1200}
                            className="h-auto w-auto lg:h-full lg:max-w-none object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}