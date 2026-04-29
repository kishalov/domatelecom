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
            /* ИСПРАВЛЕНО: Добавлены md:bg-[url('/cable-bg.svg')] и сопутствующие классы. 
               На мобилках (до md) фона не будет. */
            className="py-10 md:py-16 lg:py-24 md:bg-[url('/cable-bg.svg')] md:bg-contain md:bg-center md:bg-no-repeat"
        >
            {/* ИСПРАВЛЕНО: Заменили lg:px-0 на lg:px-8, чтобы контент не лип к краям на 11-13 дюймах */}
            <div className="mx-auto flex max-w-[1360px] flex-col px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-6 mb-10 lg:mb-16">
                    <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                        С нами все онлайн
                    </h2>

                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
                        <p className="text-base leading-relaxed sm:text-lg text-foreground/90">
                            Не разбираешься в тарифах? <br className="hidden sm:block" />
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
                            className="w-full h-12 rounded-xl text-md sm:w-fit px-8"
                        >
                            Заполнить
                        </Button>
                    </div>
                </div>

                {/* СЕТКА: Адаптировали отступы (gap), чтобы карточки не слипались */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-8 sm:gap-10 lg:gap-x-12 lg:gap-y-20">
                    
                    <div className="relative aspect-square w-full max-w-[300px] mx-auto lg:max-w-full">
                        <Image
                            src="/about-1.png"
                            alt="Молодой специалист в наушниках работает за компьютером с двумя мониторами в комнате с неоновой синей подсветкой. Изображение подчеркивает современный подход и технологичность сервиса ДомаТелеком."
                            width={300}
                            height={300}
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    <Card className="relative overflow-visible p-6 sm:p-8 shadow-md border-none lg:scale-105 transition-transform">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 pr-8">
                            Эксперты в подборе оборудования
                        </h3>
                        <p className="text-base sm:text-lg text-foreground/80 leading-relaxed pr-4">
                            Расскажем о плюсах и минусах роутеров и подберем лучший вариант
                        </p>

                        <Image
                            src="/router.png"
                            alt="Иконка трех антенного синего Wi-Fi роутера в блоке экспертной помощи."
                            width={140}
                            height={140}
                            className="absolute pointer-events-none w-[90px] sm:w-[110px] lg:w-[130px] -top-6 -right-2 lg:-top-10 lg:-right-6"
                        />
                    </Card>

                    <div className="relative aspect-square w-full max-w-[300px] mx-auto lg:max-w-full">
                        <Image
                            src="/about-2.png"
                            alt="Мастер по установке интернета в фирменной кепке держит в руках белый Wi-Fi роутер и сетевой кабель. На плече у специалиста висит моток желтого кабеля, что символизирует готовность к проведению монтажных работ."
                            width={300}
                            height={300}
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    <div className="relative bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 flex flex-col gap-3 shadow-sm overflow-visible h-full justify-center">
                        <h3 className="text-xl sm:text-2xl font-bold pr-10">
                            Говорим с тобой на одном языке
                        </h3>
                        <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                            Не работает интернет? Мы знаем, как бороться
                        </p>

                        <Image
                            src="/code.png"
                            alt="3D-иконка синих угловых скобок со слэшем </>, символизирующая программный код и техническую грамотность службы поддержки в решении проблем с интернетом."
                            width={160}
                            height={160}
                            className="absolute pointer-events-none w-[100px] sm:w-[130px] lg:w-[150px] -bottom-8 -right-4 lg:-bottom-12 lg:-right-8"
                        />
                    </div>

                    <div className="relative aspect-video lg:aspect-square w-full max-w-[400px] mx-auto lg:max-w-full">
                        <Image
                            src="/about-3.png"
                            alt="3D-модель ярко-синего открытого ноутбука в окружении парящих неоновых иконок земного шара и мобильных устройств на темном фоне. Изображение символизирует глобальный доступ к цифровым сервисам и стабильное интернет-соединение на любых устройствах."
                            width={1000}
                            height={160}
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    <div className="relative bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 flex flex-col gap-3 shadow-sm overflow-visible h-full justify-center">
                        <h3 className="text-xl sm:text-2xl font-bold pr-10">
                            С нами сменить провайдера — просто
                        </h3>
                        <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                            Подберем тариф со стабильной скоростью без сюрпризов
                        </p>

                        <Image
                            src="/cursor.png"
                            alt="Объемная 3D-иконка синего компьютерного курсора-стрелки, направленного вверх, символизирующая простоту выбора и легкость перехода к новому интернет-провайдеру в один клик."
                            width={160}
                            height={160}
                            className="absolute pointer-events-none w-[100px] sm:w-[130px] lg:w-[150px] -bottom-8 -right-4 lg:-bottom-12 lg:-right-8"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}