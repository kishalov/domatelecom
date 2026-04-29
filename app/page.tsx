import Header from "@/components/header"
import HeroTabsSection from "@/components/hero-tabs-section"
import AboutSection from "@/components/about-section"
import QuizSection from "@/components/quiz"
import { PartnersMarquee } from "@/components/partners-marquee"
import { SpeedTestSection } from "@/components/speed-test"
import { CtaPromoSection } from "@/components/cta"
import { ExtraServicesSection } from "@/components/extra-services"
import { ArticlesSection } from "@/components/blog"
import { ReasonsSection } from "@/components/reasons"
import EndScrollSection from "@/components/end-scroll"
import FaqSection from "@/components/faq"
import Footer from "@/components/footer"

// 1. Увеличили прозрачность и подняли z-index до 0
const FloatingBlob = ({ className }: { className?: string }) => (
  <div 
    className={`absolute rounded-full blur-[50px] pointer-events-none z-0 opacity-80 ${className}`}
    style={{ backgroundColor: '#8EA2FF' }}
    aria-hidden="true"
  />
);

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="flex flex-col overflow-hidden relative bg-transparent">

        {/* Группа: Hero -> About */}
        <div className="relative z-0">
          <FloatingBlob className="top-200 -right-80 w-[700px] h-[700px]" />
          {/* Контент оборачиваем в z-10, чтобы он был НАД эллипсом */}
          <div className="relative z-10">
            <HeroTabsSection/>
            <AboutSection />
          </div>
        </div>

        <div className="relative z-10">
          <QuizSection />
        </div>

        {/* Секция партнеров */}
        <div className="relative z-0">
          <FloatingBlob className="-left-0 top-80 w-150 h-150 opacity-100" />
          <div className="relative z-10">
            <PartnersMarquee />
          </div>
        </div>

        <div className="relative z-10">
          <SpeedTestSection />
          <CtaPromoSection />
        </div>

        {/* Группа: Сервисы -> Блог */}
        <div className="relative z-0">
          <FloatingBlob className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] opacity-40" />
          <div className="relative z-10">
            <ExtraServicesSection />
            <ArticlesSection />
          </div>
        </div>

        <div className="relative z-10">
          <ReasonsSection />
        </div>

        {/* Группа: EndScroll -> FAQ */}
        <div className="relative z-0">
          <FloatingBlob className="top-80 -left-100 w-[800px] h-[800px]" />
          <div className="relative z-10">
            <EndScrollSection />
            <FaqSection />
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}