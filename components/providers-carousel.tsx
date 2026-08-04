"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

type ProviderItem = {
  name: string;
  logo: string | null;
};

function ProviderCard({
  provider,
  isActive,
}: {
  provider: ProviderItem;
  isActive: boolean;
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
            alt={`Тарифы провайдера ${provider.name} - подбор и консультация в вашем городе`}
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
        <span className="text-xl sm:text-2xl lg:text-[28px]">
          {provider.name}
        </span>
      </div>
    </div>
  );
}

export function ProvidersCarousel({
  providers,
}: {
  providers: ProviderItem[];
}) {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState<number>(0);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "center", loop: providers.length > 3 }}
      className="w-full"
    >
      <CarouselContent className="-ml-3 items-center sm:-ml-4 lg:-ml-6">
        {providers.map((provider, index) => (
          <CarouselItem
            key={provider.name}
            className="basis-full pl-3 sm:basis-1/2 sm:pl-4 lg:basis-1/3 lg:pl-6"
          >
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
              type="button"
              aria-label={`Показать провайдера ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={[
                "h-2.5 w-2.5 rounded-full transition-all duration-200",
                index === current
                  ? "scale-150 bg-primary sm:scale-200"
                  : "bg-white",
              ].join(" ")}
            />
          ))}
        </div>
        <CarouselNext className="static h-10 w-10 translate-y-0 rounded-full border-0 bg-primary text-primary-foreground hover:bg-primary/90 sm:h-12 sm:w-12" />
      </div>
    </Carousel>
  );
}
