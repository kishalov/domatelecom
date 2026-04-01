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

export default function HomePage() {
	return (
		<>
			<Header />

			<main className="flex flex-col">
        <HeroTabsSection/>
        <AboutSection />
        <QuizSection />
        <PartnersMarquee />
        <SpeedTestSection />
        <CtaPromoSection />
        <ExtraServicesSection />
        <ArticlesSection />
        <ReasonsSection />
        <EndScrollSection />
        <FaqSection />
			</main>
      <Footer />
		</>
	)
}