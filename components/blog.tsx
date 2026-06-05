"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card } from "./ui/card"

const articles = [
    {
        id: 1,
        title: "Недорогие гигабитные роутеры",
        desc: "Собрали надёжные и недорогие модели для быстрого интернета.",
        img: "/article-1.png",
        link: "#",
        linkLabel: "Смотреть подборку",
    },
    {
        id: 2,
        title: "Правильное расположение Wi-Fi роутера влияет на интернет",
        desc: "Вот несколько рекомендаций, которые помогут обеспечить оптимальное покрытие сети:",
        img: "/article-2.png",
        link: "#",
        linkLabel: "Читать дальше",
    },
    {
        id: 3,
        title: "Актуален ли тариф «Интернет + ТВ», если вы редко пользуетесь телевизором?",
        desc: "",
        img: "/article-3.png",
        link: "#",
        linkLabel: "Читать дальше",
    },
]

export function ArticlesSection() {
    return (
        <section className="w-full py-10 sm:py-14 lg:py-20">
            <div className="mx-auto flex max-w-[1360px] flex-col gap-6 px-4 sm:gap-8 sm:px-6 lg:gap-10 lg:px-8">
                {articles.map((a) => (
                    <div key={a.id} className="relative flex w-full flex-col lg:flex-row">
                        
                        <div className="relative z-0 h-[200px] w-full overflow-hidden rounded-2xl bg-white sm:h-[260px] lg:h-auto lg:w-[630px] lg:rounded-l-3xl lg:rounded-tr-none lg:rounded-br-none">
                            <Image
                                src={a.img}
                                alt={
                                    a.id === 1
                                        ? "Подборка роутеров от ДомаТелеком"
                                        : a.id === 2
                                            ? "Советы по расположению роутера в квартире от ДомаТелеком"
                                            : "Разбор пакетных тарифов провайдеров от ДомаТелеком"
                                }
                                fill
                                sizes="(min-width: 1024px) 630px, 100vw"
                                className="object-cover"
                            />
                        </div>

                        <Card 
                            className={`
                                relative w-full p-5 sm:p-6 lg:-ml-12 lg:grid lg:grid-cols-2 lg:items-end lg:p-6
                                
                                /* Магия для айфона: 
                                   -mt-10 — заставляет карточку "наползти" на 40px вверх поверх картинки.
                                   z-10 — гарантирует, что карточка будет сверху картинки.
                                */
                                -mt-10 z-10 
                                
                                /* Сброс магии для ПК:
                                   lg:mt-0 — убирает отрицательный маржин на больших экранах, сохраняя твой визуал.
                                */
                                lg:mt-0 lg:z-auto
                            `}
                        >
                            <div className="flex flex-col gap-3 lg:max-w-[650px]">
                                <h3 className="text-xl font-bold sm:text-2xl lg:text-3xl">
                                    {a.title}
                                </h3>

                                {a.desc && (
                                    <p className="text-base sm:text-lg">
                                        {a.desc}
                                    </p>
                                )}
                            </div>

                            <Link
                                href={a.link}
                                className="mt-4 flex items-center justify-start gap-2 text-base font-bold text-primary sm:text-lg lg:mt-0 lg:justify-end whitespace-nowrap"
                            >
                                {a.linkLabel}
                                <ArrowRight className="h-5 w-5" />
                            </Link>

                        </Card>
                    </div>
                ))}
            </div>
        </section>
    )
}