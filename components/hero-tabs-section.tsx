"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useCity } from "./city-provider";
import { useContactForm } from "./form-provider";

type TabKey = "flat" | "office" | "house";

type ProviderItem = {
  name: string;
  logo: string | null;
};

type AddressSuggestion = {
  value: string;
};

type AhunterResponse = {
  suggestions?: AddressSuggestion[];
};

const TITLES: Record<TabKey, string> = {
  flat: "Домашний интернет в квартиру",
  office: "Домашний интернет для бизнеса",
  house: "Домашний интернет в частный дом",
};

const getPlural = (number: number, one: string, two: string, five: string) => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) return five;
  n %= 10;
  if (n === 1) return one;
  if (n >= 2 && n <= 4) return two;
  return five;
};

const ProvidersCarousel = dynamic(
  () =>
    import("@/components/providers-carousel").then(
      (mod) => mod.ProvidersCarousel,
    ),
  {
    loading: () => (
      <div className="text-center text-sm text-muted-foreground">
        Загружаем карусель провайдеров…
      </div>
    ),
    ssr: false,
  },
);

const SearchProgressDialog = dynamic(
  () =>
    import("@/components/search-progress-dialog").then(
      (mod) => mod.SearchProgressDialog,
    ),
  { ssr: false },
);

export default function HeroTabsSection() {
  const [tab, setTab] = React.useState<TabKey>("flat");
  const { city, openPicker } = useCity();
  const { openContactForm } = useContactForm();

  const [street, setStreet] = React.useState("");
  const [house, setHouse] = React.useState("");
  const [flat, setFlat] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);

  const [providers, setProviders] = React.useState<ProviderItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchSuggestions = async (query: string) => {
    setStreet(query);
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const cityName = city?.name || "";
      const res = await fetch(
        `/api/ahunter?query=${encodeURIComponent(query)}&city=${encodeURIComponent(cityName)}`,
      );
      const data = (await res.json()) as AhunterResponse;
      setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : []);
      setShowSuggestions(true);
    } catch (e) {
      console.error("Ошибка подсказок", e);
    }
  };

  const handleFind = () => {
    if (!street) return;
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      const count = Math.floor(Math.random() * 6) + 4;

      const word = getPlural(count, "тариф", "тарифа", "тарифов");

      openContactForm({
        title: `Мы подобрали для вас ${count} ${word}! Оставьте номер телефона для связи, мы позвоним и все расскажем!`,
        source: `Поиск: ${tab}, Адрес: ${street}, д. ${house}${flat ? (tab === "flat" ? ", кв. " : ", оф. ") + flat : ""}`,
      });
    }, 2500);
  };

  React.useEffect(() => {
    let alive = true;
    const load = async () => {
      if (!city?.name || !city?.region) {
        setProviders([]);
        return;
      }
      setLoading(true);
      try {
        const qs = new URLSearchParams({
          region: city.region,
          city: city.name,
        });
        const res = await fetch(`/api/providers?${qs.toString()}`);
        const json = await res.json();
        if (alive)
          setProviders(Array.isArray(json.providers) ? json.providers : []);
      } catch {
        if (alive) setProviders([]);
      } finally {
        if (alive) setLoading(false);
      }
    };
    void load();
    return () => {
      alive = false;
    };
  }, [city?.name, city?.region]);

  const SuggestionsList = () =>
    showSuggestions &&
    suggestions.length > 0 && (
      <div className="absolute z-[100] top-full mt-1 left-0 w-full bg-white border rounded-md shadow-xl max-h-60 overflow-auto">
        {suggestions.map((s, i) => (
          <div
            key={i}
            className="p-3 hover:bg-slate-100 cursor-pointer text-sm border-b last:border-0 text-left"
            onMouseDown={() => {
              setStreet(s.value);
              setSuggestions([]);
              setShowSuggestions(false);
            }}
          >
            {s.value}
          </div>
        ))}
      </div>
    );

  return (
    <section className="w-full py-10 sm:py-12 lg:py-16">
      <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-8 px-4 sm:gap-10 sm:px-6 lg:gap-12 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-3 text-3xl font-bold leading-tight sm:mb-4 sm:text-4xl lg:text-5xl">
            {TITLES[tab]}
          </h1>
          <h2 className="mt-1 max-w-5xl text-lg leading-relaxed sm:mt-2 sm:text-2xl lg:text-3xl">
            ДомаТелеком — агрегатор провайдеров по всей России. Подберем лучший
            тариф под твои задачи и подключим за 24 часа.
          </h2>
        </div>

        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as TabKey)}
          className="w-full items-center gap-0"
        >
          <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-start">
            <Button
              onClick={openPicker}
              variant="secondary"
              className="w-full rounded-xl lg:w-auto"
            >
              <MapPin className="mr-2 h-4 w-4" />
              {city ? city.name : "Выбрать город"}
            </Button>

            <div className="flex w-full items-center justify-center">
              <TabsList className="h-auto w-full gap-2 sm:grid sm:grid-cols-3 sm:w-auto">
                <TabsTrigger
                  value="flat"
                  className="w-full text-sm p-3 sm:px-12 sm:py-3 sm:text-xl"
                >
                  В квартиру
                </TabsTrigger>
                <TabsTrigger
                  value="office"
                  className="w-full text-sm p-3 sm:px-12 sm:py-3 sm:text-xl"
                >
                  В офис
                </TabsTrigger>
                <TabsTrigger
                  value="house"
                  className="w-full text-sm p-3 sm:px-12 sm:py-3 sm:text-xl"
                >
                  В частный дом
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <Card className="w-full p-6">
            <CardContent className="sm:p-6 p-0">
              <TabsContent value="flat" className="mt-0">
                <div className="w-full gap-3 grid grid-cols-2 sm:flex sm:flex-row">
                  <div className="relative flex-[3] col-span-2 sm:col-span-1">
                    <Input
                      placeholder="Улица"
                      className="text-base md:text-md"
                      value={street}
                      onChange={(e) => fetchSuggestions(e.target.value)}
                      onFocus={() =>
                        street.length >= 3 && setShowSuggestions(true)
                      }
                      onBlur={() =>
                        setTimeout(() => setShowSuggestions(false), 200)
                      }
                    />
                    <SuggestionsList />
                  </div>
                  <Input
                    placeholder="Дом"
                    className="text-base md:text-md flex-1"
                    value={house}
                    onChange={(e) => setHouse(e.target.value)}
                  />
                  <Input
                    placeholder="Квартира"
                    className="text-base md:text-md flex-1"
                    value={flat}
                    onChange={(e) => setFlat(e.target.value)}
                  />
                  <Button
                    className="w-full rounded-xl text-base md:text-md lg:w-auto col-span-2 sm:col-span-1"
                    onClick={handleFind}
                  >
                    Найти
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="office" className="mt-0">
                <div className="flex w-full flex-col gap-3 lg:flex-row">
                  <div className="relative flex-[3]">
                    <Input
                      placeholder="Улица"
                      className="text-base md:text-md w-full"
                      value={street}
                      onChange={(e) => fetchSuggestions(e.target.value)}
                      onFocus={() =>
                        street.length >= 3 && setShowSuggestions(true)
                      }
                      onBlur={() =>
                        setTimeout(() => setShowSuggestions(false), 200)
                      }
                    />
                    <SuggestionsList />
                  </div>
                  <Input
                    placeholder="Дом"
                    className="text-base md:text-md flex-1"
                    value={house}
                    onChange={(e) => setHouse(e.target.value)}
                  />
                  <Input
                    placeholder="Офис"
                    className="text-base md:text-md flex-1"
                    value={flat}
                    onChange={(e) => setFlat(e.target.value)}
                  />
                  <Button
                    className="w-full rounded-xl text-base md:text-md lg:w-auto"
                    onClick={handleFind}
                  >
                    Найти
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="house" className="mt-0">
                <div className="flex w-full flex-col gap-3 lg:flex-row">
                  <div className="relative flex-[3]">
                    <Input
                      placeholder="Улица"
                      className="text-base md:text-md w-full"
                      value={street}
                      onChange={(e) => fetchSuggestions(e.target.value)}
                      onFocus={() =>
                        street.length >= 3 && setShowSuggestions(true)
                      }
                      onBlur={() =>
                        setTimeout(() => setShowSuggestions(false), 200)
                      }
                    />
                    <SuggestionsList />
                  </div>
                  <Input
                    placeholder="Дом"
                    className="text-base md:text-md flex-1"
                    value={house}
                    onChange={(e) => setHouse(e.target.value)}
                  />
                  <Button
                    className="w-full rounded-xl text-base md:text-md lg:w-auto"
                    onClick={handleFind}
                  >
                    Найти
                  </Button>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>

        {isSearching ? (
          <SearchProgressDialog
            open={isSearching}
            street={street}
            onOpenChange={setIsSearching}
          />
        ) : null}

        <div className="w-full">
          <h2 className="mb-8 text-center text-3xl font-bold leading-tight sm:mb-10 sm:text-4xl lg:mb-12 lg:text-5xl">
            Лучшие провайдеры в{" "}
            {city?.name ? `г. ${city.name}` : "вашем городе"}
          </h2>
          {loading ? (
            <div className="text-center text-sm text-muted-foreground">
              Загружаем провайдеров…
            </div>
          ) : providers.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground">
              {city
                ? "Для выбранного города провайдеры не найдены."
                : "Выберите город, чтобы показать провайдеров."}
            </div>
          ) : (
            <ProvidersCarousel providers={providers} />
          )}
        </div>
      </div>
    </section>
  );
}
