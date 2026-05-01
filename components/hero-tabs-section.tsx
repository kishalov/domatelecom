"use client"

import * as React from "react"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin } from "lucide-react"
import { useCity } from "./city-provider"
import { useContactForm } from "./form-provider"

type TabKey = "flat" | "office" | "house"

type ProviderItem = {
    name: string
    logo: string | null
}

const TITLES: Record<TabKey, string> = {
    flat: "Домашний интернет в квартиру",
    office: "Домашний интернет для бизнеса",
    house: "Домашний интернет в частный дом",
}

const FORM_TITLES: Record<TabKey, string> = {
    flat: "Оставьте заявку на подключение домашнего интернета",
    office: "Оставьте заявку на подключение интернета для бизнеса",
    house: "Оставьте заявку на подключение интернета в частный дом",
}

const getPlural = (number: number, one: string, two: string, five: string) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) return five;
    n %= 10;
    if (n === 1) return one;
    if (n >= 2 && n <= 4) return two;
    return five;
};

function ProviderCard({
    provider,
    isActive,
}: {
    provider: ProviderItem
    isActive: boolean
}) {
    return (
        <div
            className={[
                "mx-auto flex min-h-[260px] w-full max-w-[420px] flex-col items-center justify-center rounded-[24px] bg-white px-6 py-8 transition-all duration-300 ease-out sm:min-h-[300px] sm:rounded-[28px] sm:px-8 sm:py-10 lg:min-h-[360px] lg:rounded-[32px] lg:px-10",
                isActive ? "scale-100 opacity-100" : "scale-90 opacity-80",
            ].join(" ")}
        >
            <div className="relative mb-6 flex h-[96px] w-full max-w-[150px] items-center justify-center sm:mb-7 sm:h-[120px] sm:max-w-[170px] lg:mb-8 lg:h-[150px] lg:max-w-[190px]">
                {provider.logo ? (
                    <Image
                        src={provider.logo}
                        alt={provider.name}
                        width={190}
                        height={150}
                        className="h-auto max-h-full w-auto max-w-full object-contain"
                    />
                ) : (
                    <div className="text-center text-sm text-muted-foreground">
                        Логотип не найден
                    </div>
                )}
            </div>

            <div
                className={[
                    "text-center font-bold leading-none transition-all duration-300",
                    isActive ? "scale-100" : "scale-90",
                ].join(" ")}
            >
                <span className="text-xl sm:text-2xl lg:text-[28px]">{provider.name}</span>
            </div>
        </div>
    )
}

export default function HeroTabsSection() {
    const [tab, setTab] = React.useState<TabKey>("flat")
    const { city, openPicker } = useCity()
    const { openContactForm } = useContactForm()

    // --- ЛОГИКА ПОЛЕЙ ---
    const [street, setStreet] = React.useState("")
    const [house, setHouse] = React.useState("")
    const [flat, setFlat] = React.useState("")
    const [suggestions, setSuggestions] = React.useState<any[]>([])
    const [showSuggestions, setShowSuggestions] = React.useState(false)
    const [isSearching, setIsSearching] = React.useState(false)

    const [providers, setProviders] = React.useState<ProviderItem[]>([])
    const [loading, setLoading] = React.useState<boolean>(false)
    const [api, setApi] = React.useState<CarouselApi | null>(null)
    const [current, setCurrent] = React.useState<number>(0)

  const fetchSuggestions = async (query: string) => {
    setStreet(query)
    if (query.length < 3) {
        setSuggestions([])
        return
    }
    try {

        const cityName = city?.name || ""
        const res = await fetch(`/api/ahunter?query=${encodeURIComponent(query)}&city=${encodeURIComponent(cityName)}`)
        const data = await res.json()
        setSuggestions(data.suggestions || [])
        setShowSuggestions(true)
    } catch (e) {
        console.error("Ошибка подсказок", e)
    }
}

const handleFind = () => {
    if (!street) return
    setIsSearching(true)

    setTimeout(() => {
        setIsSearching(false)
        const count = Math.floor(Math.random() * 6) + 4
        
        // Склоняем слово "тариф"
        const word = getPlural(count, "тариф", "тарифа", "тарифов");

        openContactForm({
            title: `Мы подобрали для вас ${count} ${word}! Оставьте номер телефона для связи, мы позвоним и все расскажем!`,
            source: `Поиск: ${tab}, Адрес: ${street}, д. ${house}${flat ? (tab === 'flat' ? ', кв. ' : ', оф. ') + flat : ''}`,
        })
    }, 2500)
}

    // Загрузка провайдеров
    React.useEffect(() => {
        let alive = true
        const load = async () => {
            if (!city?.name || !city?.region) {
                setProviders([])
                return
            }
            setLoading(true)
            try {
                const qs = new URLSearchParams({ region: city.region, city: city.name })
                const res = await fetch(`/api/providers?${qs.toString()}`, { cache: "no-store" })
                const json = await res.json()
                if (alive) setProviders(Array.isArray(json.providers) ? json.providers : [])
            } catch {
                if (alive) setProviders([])
            } finally {
                if (alive) setLoading(false)
            }
        }
        void load()
        return () => { alive = false }
    }, [city?.name, city?.region])

    // Карусель
    React.useEffect(() => {
        if (!api) return
        const onSelect = () => setCurrent(api.selectedScrollSnap())
        api.on("select", onSelect)
        api.on("reInit", onSelect)
        return () => {
            api.off("select", onSelect)
            api.off("reInit", onSelect)
        }
    }, [api])

    // Рендер выпадающего списка подсказок
    const SuggestionsList = () => (
        showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-[100] top-full mt-1 left-0 w-full bg-white border rounded-md shadow-xl max-h-60 overflow-auto">
                {suggestions.map((s, i) => (
                    <div 
                        key={i} 
                        className="p-3 hover:bg-slate-100 cursor-pointer text-sm border-b last:border-0 text-left"
                        onMouseDown={() => {
                            setStreet(s.value)
                            setSuggestions([])
                            setShowSuggestions(false)
                        }}
                    >
                        {s.value}
                    </div>
                ))}
            </div>
        )
    )

    return (
        <section className="w-full py-10 sm:py-12 lg:py-16">
            <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-8 px-4 sm:gap-10 sm:px-6 lg:gap-12 lg:px-8">
                <div className="flex flex-col items-center justify-center text-center">
                    <h1 className="mb-3 text-3xl font-bold leading-tight sm:mb-4 sm:text-4xl lg:text-5xl">
                        {TITLES[tab]}
                    </h1>
                    <h2 className="mt-1 max-w-5xl text-lg leading-relaxed sm:mt-2 sm:text-2xl lg:text-3xl">
                        ДомаТелеком — агрегатор провайдеров по всей России. Подберем лучший тариф под твои задачи и подключим за 24 часа.
                    </h2>
                </div>

                <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)} className="w-full items-center gap-0">
                    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-start">
                        <Button onClick={openPicker} variant="secondary" className="w-full rounded-xl lg:w-auto">
                            <MapPin className="mr-2 h-4 w-4" />
                            {city ? city.name : "Выбрать город"}
                        </Button>

                        <div className="flex w-full items-center justify-center">
                            <TabsList className="h-auto w-full gap-2 sm:grid sm:grid-cols-3 sm:w-auto">
                                <TabsTrigger value="flat" className="w-full text-sm p-3 sm:px-12 sm:py-3 sm:text-xl">В квартиру</TabsTrigger>
                                <TabsTrigger value="office" className="w-full text-sm p-3 sm:px-12 sm:py-3 sm:text-xl">В офис</TabsTrigger>
                                <TabsTrigger value="house" className="w-full text-sm p-3 sm:px-12 sm:py-3 sm:text-xl">В частный дом</TabsTrigger>
                            </TabsList>
                        </div>
                    </div>

                    <Card className="w-full p-6">
                        <CardContent className="sm:p-6 p-0">
                            {/* В КВАРТИРУ */}
                            <TabsContent value="flat" className="mt-0">
                                <div className="w-full gap-3 grid grid-cols-2 sm:flex sm:flex-row">
                                    <div className="relative flex-[3] col-span-2 sm:col-span-1">
                                        <Input 
                                            placeholder="Улица" 
                                            className="text-base md:text-md" 
                                            value={street}
                                            onChange={(e) => fetchSuggestions(e.target.value)}
                                            onFocus={() => street.length >= 3 && setShowSuggestions(true)}
                                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                        />
                                        <SuggestionsList />
                                    </div>
                                    <Input placeholder="Дом" className="text-base md:text-md flex-1" value={house} onChange={(e) => setHouse(e.target.value)} />
                                    <Input placeholder="Квартира" className="text-base md:text-md flex-1" value={flat} onChange={(e) => setFlat(e.target.value)} />
                                    <Button className="w-full rounded-xl text-base md:text-md lg:w-auto col-span-2 sm:col-span-1" onClick={handleFind}>Найти</Button>
                                </div>
                            </TabsContent>

                            {/* В ОФИС */}
                            <TabsContent value="office" className="mt-0">
                                <div className="flex w-full flex-col gap-3 lg:flex-row">
                                    <div className="relative flex-[3]">
                                        <Input 
                                            placeholder="Улица" 
                                            className="text-base md:text-md w-full" 
                                            value={street}
                                            onChange={(e) => fetchSuggestions(e.target.value)}
                                            onFocus={() => street.length >= 3 && setShowSuggestions(true)}
                                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                        />
                                        <SuggestionsList />
                                    </div>
                                    <Input placeholder="Дом" className="text-base md:text-md flex-1" value={house} onChange={(e) => setHouse(e.target.value)} />
                                    <Input placeholder="Офис" className="text-base md:text-md flex-1" value={flat} onChange={(e) => setFlat(e.target.value)} />
                                    <Button className="w-full rounded-xl text-base md:text-md lg:w-auto" onClick={handleFind}>Найти</Button>
                                </div>
                            </TabsContent>

                            {/* В ЧАСТНЫЙ ДОМ */}
                            <TabsContent value="house" className="mt-0">
                                <div className="flex w-full flex-col gap-3 lg:flex-row">
                                    <div className="relative flex-[3]">
                                        <Input 
                                            placeholder="Улица" 
                                            className="text-base md:text-md w-full" 
                                            value={street}
                                            onChange={(e) => fetchSuggestions(e.target.value)}
                                            onFocus={() => street.length >= 3 && setShowSuggestions(true)}
                                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                        />
                                        <SuggestionsList />
                                    </div>
                                    <Input placeholder="Дом" className="text-base md:text-md flex-1" value={house} onChange={(e) => setHouse(e.target.value)} />
                                    <Button className="w-full rounded-xl text-base md:text-md lg:w-auto" onClick={handleFind}>Найти</Button>
                                </div>
                            </TabsContent>
                        </CardContent>
                    </Card>
                </Tabs>

                <Dialog open={isSearching} onOpenChange={setIsSearching}>
                    <DialogContent className="sm:max-w-[420px] text-center p-10">
                        <DialogHeader>
                            <DialogTitle className="text-2xl mb-4 text-center">Поиск провайдеров...</DialogTitle>
                        </DialogHeader>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-primary h-full animate-[progress_2.5s_ease-in-out]" style={{width: '100%'}}></div>
                        </div>
                        <p className="mt-4 text-muted-foreground text-sm">Проверяем адрес: {street}</p>
                    </DialogContent>
                </Dialog>

                {/* Блок провайдеров (карусель) остается без изменений */}
                <div className="w-full">
                    <h2 className="mb-8 text-center text-3xl font-bold leading-tight sm:mb-10 sm:text-4xl lg:mb-12 lg:text-5xl">
                        Лучшие провайдеры в {city?.name ? `г. ${city.name}` : "вашем городе"}
                    </h2>
                    {loading ? (
                        <div className="text-center text-sm text-muted-foreground">Загружаем провайдеров…</div>
                    ) : providers.length === 0 ? (
                        <div className="text-center text-sm text-muted-foreground">
                            {city ? "Для выбранного города провайдеры не найдены." : "Выберите город, чтобы показать провайдеров."}
                        </div>
                    ) : (
                        <Carousel setApi={setApi} opts={{ align: "center", loop: providers.length > 3 }} className="w-full">
                            <CarouselContent className="-ml-3 items-center sm:-ml-4 lg:-ml-6">
                                {providers.map((provider, index) => (
                                    <CarouselItem key={provider.name} className="basis-full pl-3 sm:basis-1/2 sm:pl-4 lg:basis-1/3 lg:pl-6">
                                        <div className="flex items-center justify-center">
                                            <ProviderCard provider={provider} isActive={index === current} />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="mt-5 flex items-center justify-center gap-3 sm:mt-6 sm:gap-5">
                                <CarouselPrevious className="static h-10 w-10 translate-y-0 rounded-full border-0 bg-primary text-primary-foreground hover:bg-primary/90 sm:h-12 sm:w-12" />
                                <div className="flex items-center gap-2 sm:gap-3">
                                    {providers.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => api?.scrollTo(index)}
                                            className={["h-2.5 w-2.5 rounded-full transition-all duration-200", index === current ? "scale-150 bg-primary sm:scale-200" : "bg-white"].join(" ")}
                                        />
                                    ))}
                                </div>
                                <CarouselNext className="static h-10 w-10 translate-y-0 rounded-full border-0 bg-primary text-primary-foreground hover:bg-primary/90 sm:h-12 sm:w-12" />
                            </div>
                        </Carousel>
                    )}
                </div>
            </div>
        </section>
    )
}