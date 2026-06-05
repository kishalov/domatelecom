"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function NotFound() {
    return (
        // ИСПРАВЛЕНО: py-0 на мобилках/планшетах, чтобы не добавлять лишних пикселей к высоте
        <section className="relative flex h-screen min-h-screen w-full items-center justify-center bg-secondary py-0 font-[family-name:var(--font-montserrat)] overflow-hidden sm:py-6">
            
            <div 
                className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] pointer-events-none opacity-60"
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto flex w-full max-w-[1360px] flex-col items-center justify-center px-4 md:px-6">
                
                {/* ИСПРАВЛЕНО: Ограничили высоту карточки через h-fit и убрали max-h-none для планшетов */}
                <Card className="h-fit w-full overflow-hidden rounded-[32px] border-none bg-white shadow-xl">
                    
                    {/* ИСПРАВЛЕНО: Агрессивно уменьшили паддинги: p-5 на мобилках/планшетах */}
                    <CardContent className="flex flex-col items-center p-5 text-center sm:p-8 lg:p-12">
                        
                        {/* ИСПРАВЛЕНО: Картинка теперь еще компактнее на планшетах (h-32 -> h-48) */}
                        <div className="relative mb-2 h-32 w-full max-w-[240px] xs:h-40 sm:h-48 md:h-56 lg:h-72">
                            <Image
                                src="/images/cat404.png"
                                alt="404"
                                fill
                                sizes="(min-width: 1024px) 288px, (min-width: 640px) 240px, 160px"
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Число 404 - стало компактнее по высоте */}
                        <h1 className="mb-1 text-[48px] font-black leading-[1.1] text-primary sm:text-[70px] md:text-[90px] lg:text-[120px]">
                            404
                        </h1>

                        <h2 className="mb-2 text-base font-bold text-black sm:text-xl lg:text-3xl">
                            Ой! Страница не найдена
                        </h2>

                        <p className="mb-6 max-w-[400px] text-[11px] leading-tight text-gray-600 sm:text-sm lg:text-lg">
                            Похоже, этот адрес больше не существует. Давайте вернемся на главную и найдем лучший интернет для вас!
                        </p>

                        <Link href="/" className="w-full sm:w-auto">
                            <Button 
                                className="h-10 w-full rounded-xl px-10 text-xs font-bold sm:h-12 sm:w-auto sm:text-base lg:h-14 lg:text-lg"
                            >
                                Вернуться на главную
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}