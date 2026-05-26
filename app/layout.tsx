import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { CityProvider } from "@/components/city-provider"
import { ContactFormProvider } from "@/components/form-provider"

const montserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-montserrat",
	display: "swap",
})

export const metadata: Metadata = {
	title: "ДомаТелеком — подбор тарифов на интернет и телевидение по всей России.",
	description:
		"Бесплатный подбор провайдеров и тарифов на интернет и телевидение по всей России! Поможем подключить интернет быстро и без проблем.☎️Бесплатная консультация 8 (901) 417-56-58.",

	robots: {
		index: true,
		follow: true,
	},

openGraph: {
	type: "website",
	title:
		"ДомаТелеком — подбор тарифов на интернет и телевидение по всей России.",
	description:
		"Помогаем людям по всей стране оставаться на связи с близкими. Интернет, телевидение, мобильная связь — тарифы от провайдеров по всей России со скидками до 50%! Подключайся выгодно с ДомаТелеком.",
	url: "https://domatelecom.ru",
	siteName: "ДомаТелеком",
	locale: "ru_RU",
	images: [
		{
			url: "https://domatelecom.ru/og-image.png",
			width: 450,
			height: 450,
			alt: "ДомаТелеком",
		},
	],
},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="ru" className={montserrat.variable}>
			<ContactFormProvider>
			<body className="bg-secondary text-black antialiased">
				<CityProvider>
					{children}
				</CityProvider>
			</body>
			</ContactFormProvider>
		</html>
	)
}