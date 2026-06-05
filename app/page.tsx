import dynamic from "next/dynamic"
import Header from "@/components/header"
import HeroTabsSection from "@/components/hero-tabs-section"
import AboutSection from "@/components/about-section"
import Footer from "@/components/footer"

const QuizSection = dynamic(() => import("@/components/quiz"))
const PartnersMarquee = dynamic(() =>
	import("@/components/partners-marquee").then((mod) => mod.PartnersMarquee)
)
const SpeedTestSection = dynamic(() =>
	import("@/components/speed-test").then((mod) => mod.SpeedTestSection)
)
const CtaPromoSection = dynamic(() =>
	import("@/components/cta").then((mod) => mod.CtaPromoSection)
)
const ExtraServicesSection = dynamic(() =>
	import("@/components/extra-services").then((mod) => mod.ExtraServicesSection)
)
const ArticlesSection = dynamic(() =>
	import("@/components/blog").then((mod) => mod.ArticlesSection)
)
const ReasonsSection = dynamic(() =>
	import("@/components/reasons").then((mod) => mod.ReasonsSection)
)
const EndScrollSection = dynamic(() => import("@/components/end-scroll"))
const FaqSection = dynamic(() => import("@/components/faq"))

const FloatingBlob = ({ className }: { className?: string }) => (
	<div
		className={`absolute rounded-full blur-[50px] pointer-events-none z-0 opacity-80 ${className}`}
		style={{ backgroundColor: "#8EA2FF" }}
		aria-hidden="true"
	/>
)

export default function HomePage() {
	return (
		<>
			<Header />

			<main className="flex flex-col overflow-hidden relative bg-transparent">
				<div className="relative z-0">
					<FloatingBlob className="top-200 -right-80 w-[700px] h-[700px]" />
					<div className="relative z-10">
						<HeroTabsSection />
						<AboutSection />
					</div>
				</div>

				<div className="relative z-10">
					<QuizSection />
				</div>
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
