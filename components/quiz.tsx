"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { motion, AnimatePresence } from "framer-motion"

import { SpeedSlider } from "./speed-slider"
import Speedometer from "./speedometr"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { CheckboxOther } from "./ui/checkbox-other"
import { PopoverTrigger, Popover, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

type Slide = {
	id: number
	title: React.ReactNode
	left: React.ReactNode
	right?: React.ReactNode
}

type QuizFormData = {
	service: "internet" | "internet-tv" | "internet-tv-mobile"
	speed: string
	equipment: "none" | "wifi-router" | "tv-box" | "wifi-tv"
	deniedProviders: string[]
	deniedOther: string
	connectionTiming: "soon" | "not-hurry" | "choose"
	connectionDate: string | null
	connectionTime: string | null
	fullName: string
	address: string
	phone: string
	autoSelect: boolean
}

const TIME_OPTIONS = [
	"09:00",
	"09:30",
	"10:00",
	"10:30",
	"11:00",
	"11:30",
	"12:00",
	"12:30",
	"13:00",
	"13:30",
	"14:00",
	"14:30",
	"15:00",
	"15:30",
]

export default function QuizSection() {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [date, setDate] = useState<Date | undefined>(new Date())
	const [time, setTime] = useState("00:00")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitMessage, setSubmitMessage] = useState("")
	const [denyOtherOpen, setDenyOtherOpen] = useState(false)

	const [form, setForm] = useState<QuizFormData>({
		service: "internet",
		speed: 20,
		equipment: "none",
		deniedProviders: [],
		deniedOther: "",
		connectionTiming: "choose",
		connectionDate: new Date().toISOString(),
		connectionTime: "00:00",
		fullName: "",
		address: "",
		phone: "",
		autoSelect: false,
	})

	function goTo(i: number) {
		if (i < 0 || i >= slides.length) return
		setCurrentIndex(i)
	}

	function toggleDeniedProvider(provider: string, checked: boolean) {
		setForm((prev) => {
			if (checked) {
				return {
					...prev,
					deniedProviders: [...prev.deniedProviders, provider],
				}
			}

			return {
				...prev,
				deniedProviders: prev.deniedProviders.filter((item) => item !== provider),
			}
		})
	}

	async function handleSubmit() {
		setSubmitMessage("")

		const payload: QuizFormData = {
			...form,
			connectionDate:
				form.connectionTiming === "choose" && date
					? date.toISOString()
					: null,
			connectionTime:
				form.connectionTiming === "choose"
					? time
					: null,
		}

		if (!payload.fullName.trim()) {
			setSubmitMessage("Введите ФИО")
			return
		}

		if (!payload.address.trim()) {
			setSubmitMessage("Введите адрес")
			return
		}

		if (!payload.phone.trim()) {
			setSubmitMessage("Введите номер телефона")
			return
		}

		setIsSubmitting(true)

		try {
			const response = await fetch("/api/quiz", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			})

			if (!response.ok) {
				throw new Error("Ошибка отправки")
			}

			setSubmitMessage("Заявка успешно отправлена")

			setForm({
				service: "internet",
				speed: 20,
				equipment: "none",
				deniedProviders: [],
				deniedOther: "",
				connectionTiming: "choose",
				connectionDate: new Date().toISOString(),
				connectionTime: "00:00",
				fullName: "",
				address: "",
				phone: "",
				autoSelect: false,
			})

			setDenyOtherOpen(false)
			setDate(new Date())
			setTime("00:00")
			setCurrentIndex(0)
		} catch (error) {
			setSubmitMessage("Не удалось отправить заявку")
		} finally {
			setIsSubmitting(false)
		}
	}

	const slides: Slide[] = [
		{
			id: 1,
			title: "Какие услуги планируете подключить:",
			left: (
				<RadioGroup
					className="flex flex-col gap-4"
					value={form.service}
					onValueChange={(value) =>
						setForm((prev) => ({
							...prev,
							service: value as QuizFormData["service"],
						}))
					}
				>
					<div className="flex items-start gap-2 sm:items-center">
						<RadioGroupItem id="r1" value="internet" />
						<Label htmlFor="r1">Интернет</Label>
					</div>

					<div className="flex items-start gap-2 sm:items-center">
						<RadioGroupItem id="r2" value="internet-tv" />
						<Label htmlFor="r2">Интернет + ТВ</Label>
					</div>

					<div className="flex items-start gap-2 sm:items-center">
						<RadioGroupItem id="r3" value="internet-tv-mobile" />
						<Label htmlFor="r3">Интернет + ТВ + Мобильная связь</Label>
					</div>
				</RadioGroup>
			),
			right: (
				<Image
					src="/quiz-1.svg"
					alt="Фирменный персонаж ДомаТелеком — синий кот с ярко-зелеными глазами, который задумчиво выбирает услуги связи среди парящих иконок интернета, ТВ и мобильного телефона."
					width={500}
					height={500}
					className="absolute bottom-0 right-0 w-[500px] sm:w-[280px] md:-right-6 md:w-fit"
				/>
			),
		},
		{
			id: 2,
			title: "Какая скорость вам потребуется?",
			left: (
				<SpeedSlider
					value={form.speed}
					onChange={(value) =>
						setForm((prev) => ({
							...prev,
							speed: value,
						}))
					}
				/>
			),
			right: (
				<div className="flex p-4 sm:p-6 md:p-12">
					<Speedometer value={form.speed} />
				</div>
			),
		},
		{
			id: 3,
			title: "Какое оборудование Вам понадобится:",
			left: (
				<RadioGroup
					className="flex flex-col gap-4"
					value={form.equipment}
					onValueChange={(value) =>
						setForm((prev) => ({
							...prev,
							equipment: value as QuizFormData["equipment"],
						}))
					}
				>
					<div className="flex items-start gap-2 sm:items-center">
						<RadioGroupItem id="eq1" value="none" />
						<Label htmlFor="eq1">Не понадобится</Label>
					</div>

					<div className="flex items-start gap-2 sm:items-center">
						<RadioGroupItem id="eq2" value="wifi-router" />
						<Label htmlFor="eq2">Wi-Fi роутер</Label>
					</div>

					<div className="flex items-start gap-2 sm:items-center">
						<RadioGroupItem id="eq3" value="tv-box" />
						<Label htmlFor="eq3">ТВ-приставка</Label>
					</div>

					<div className="flex items-start gap-2 sm:items-center">
						<RadioGroupItem id="eq4" value="wifi-tv" />
						<Label htmlFor="eq4">Wi-Fi роутер и ТВ-приставка</Label>
					</div>
				</RadioGroup>
			),
			right: (
				<Image
					src="/quiz-2.svg"
					alt="Фирменный синий кот ДомаТелеком с улыбкой держит на вытянутых лапах Wi-Fi роутер и ТВ-приставку. Иллюстрация наглядно сопровождает вопрос о выборе необходимого оборудования для подключения услуг."
					width={500}
					height={500}
					className="absolute bottom-0 right-0 w-[500px] sm:w-[280px] md:-right-6 md:w-fit"
				/>
			),
		},
		{
			id: 4,
			title: (
				<>
					Провайдеры которых Вы <span className="text-primary">не хотели</span> бы подключать:
				</>
			),
			left: (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
					<div className="flex items-center gap-2">
						<Checkbox
							id="deny-mts"
							checked={form.deniedProviders.includes("МТС")}
							onCheckedChange={(checked) =>
								toggleDeniedProvider("МТС", checked === true)
							}
						/>
						<Label htmlFor="deny-mts">МТС</Label>
					</div>

					<div className="flex items-center gap-2">
						<Checkbox
							id="deny-beeline"
							checked={form.deniedProviders.includes("БИЛАЙН")}
							onCheckedChange={(checked) =>
								toggleDeniedProvider("БИЛАЙН", checked === true)
							}
						/>
						<Label htmlFor="deny-beeline">БИЛАЙН</Label>
					</div>

					<div className="flex items-center gap-2">
						<Checkbox
							id="deny-domru"
							checked={form.deniedProviders.includes("ДОМ.РУ")}
							onCheckedChange={(checked) =>
								toggleDeniedProvider("ДОМ.РУ", checked === true)
							}
						/>
						<Label htmlFor="deny-domru">ДОМ.РУ</Label>
					</div>

					<div className="flex items-center gap-2">
						<Checkbox
							id="deny-ttk"
							checked={form.deniedProviders.includes("ТТК")}
							onCheckedChange={(checked) =>
								toggleDeniedProvider("ТТК", checked === true)
							}
						/>
						<Label htmlFor="deny-ttk">ТТК</Label>
					</div>

					<div className="flex items-center gap-2">
						<Checkbox
							id="deny-rt"
							checked={form.deniedProviders.includes("РОСТЕЛЕКОМ")}
							onCheckedChange={(checked) =>
								toggleDeniedProvider("РОСТЕЛЕКОМ", checked === true)
							}
						/>
						<Label htmlFor="deny-rt">РОСТЕЛЕКОМ</Label>
					</div>

					<CheckboxOther
						id="deny-other"
						label="Другие (нет в списке):"
						placeholder="Yota"
						checked={denyOtherOpen}
						value={form.deniedOther}
						onCheckedChange={(checked: boolean) => {
							setDenyOtherOpen(checked)

							if (!checked) {
								setForm((prev) => ({
									...prev,
									deniedOther: "",
								}))
							}
						}}
						onValueChange={(value: string) =>
							setForm((prev) => ({
								...prev,
								deniedOther: value,
							}))
						}
					/>
				</div>
			),
			right: (
				<Image
					src="/quiz-3.svg"
					alt="Фирменный синий кот ДомаТелеком с суровым выражением лица скрестил лапы в запрещающем жесте «стоп». Вокруг него парят логотипы различных интернет-провайдеров, что визуально подтверждает отказ от неподходящих компаний."
					width={500}
					height={500}
					className="absolute -bottom-2 right-0 w-[500px] sm:w-[280px] md:-right-6 md:w-fit"
				/>
			),
		},
		{
			id: 5,
			title: "Когда Вам нужно подключение:",
			left: (
				<RadioGroup
					value={form.connectionTiming}
					onValueChange={(value) =>
						setForm((prev) => ({
							...prev,
							connectionTiming: value as QuizFormData["connectionTiming"],
						}))
					}
					className="flex flex-col gap-4"
				>
					<div className="flex items-start gap-2 sm:items-center">
						<RadioGroupItem value="soon" id="soon" />
						<Label htmlFor="soon">В ближайший доступный день и время</Label>
					</div>

					<div className="flex items-start gap-2 sm:items-center">
						<RadioGroupItem value="not-hurry" id="not-hurry" />
						<Label htmlFor="not-hurry">Не тороплюсь</Label>
					</div>

					<div className="flex items-start gap-2 sm:items-center">
						<RadioGroupItem value="choose" id="choose" />
						<Label htmlFor="choose">Выбрать дату и время</Label>
					</div>
				</RadioGroup>
			),
			right: (
				<div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6 md:p-12">
					<div className="rounded-xl border bg-white p-4 shadow-sm">
						<Label className="mb-2 flex items-center gap-2 text-sm font-medium">
							<CalendarIcon className="h-4 w-4" />
							Выберите день
						</Label>

						<Button
							variant="outline"
							className="mb-4 w-full justify-between"
						>
							{date ? format(date, "dd.MM.yyyy", { locale: ru }) : "Не выбрано"}
						</Button>

						<div className="overflow-x-auto">
							<Calendar
								mode="single"
								selected={date}
								onSelect={setDate}
								weekStartsOn={1}
								locale={ru}
							/>
						</div>
					</div>

					<div className="rounded-xl border bg-white p-4 shadow-sm">
						<Label className="mb-2 flex items-center gap-2 text-sm font-medium">
							<Clock className="h-4 w-4" />
							Выберите время
						</Label>

						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className="w-full justify-between"
								>
									{time}
								</Button>
							</PopoverTrigger>

							<PopoverContent className="w-[140px] p-0">
								<div className="max-h-[200px] overflow-y-auto">
									{TIME_OPTIONS.map((item) => (
										<div
											key={item}
											className={`cursor-pointer px-3 py-2 hover:bg-primary/10 ${
												item === time ? "bg-primary/20 font-medium" : ""
											}`}
											onClick={() => setTime(item)}
										>
											{item}
										</div>
									))}
								</div>
							</PopoverContent>
						</Popover>
					</div>
				</div>
			),
		},
		{
			id: 6,
			title: "Введите Ваши данные для заявки:",
			left: null,
			right: (
				<div className="flex w-full flex-col gap-4 p-4 sm:p-6 md:p-12">
					<input
						type="text"
						placeholder="ФИО"
						value={form.fullName}
						onChange={(e) =>
							setForm((prev) => ({
								...prev,
								fullName: e.target.value,
							}))
						}
						className="h-14 rounded-xl border px-4 text-base"
					/>

					<input
						type="text"
						placeholder="Адрес"
						value={form.address}
						onChange={(e) =>
							setForm((prev) => ({
								...prev,
								address: e.target.value,
							}))
						}
						className="h-14 rounded-xl border px-4 text-base"
					/>

					<input
						type="tel"
						placeholder="Номер телефона"
						value={form.phone}
						onChange={(e) =>
							setForm((prev) => ({
								...prev,
								phone: e.target.value,
							}))
						}
						className="h-14 rounded-xl border px-4 text-base"
					/>

					<div className="mt-2 flex items-start gap-2 sm:items-center">
						<Checkbox
							id="auto-select"
							checked={form.autoSelect}
							onCheckedChange={(checked) =>
								setForm((prev) => ({
									...prev,
									autoSelect: checked === true,
								}))
							}
						/>
						<Label htmlFor="auto-select" className="text-sm text-muted-foreground">
							Мне не нужно перезванивать, выберите и договоритесь за меня
						</Label>
					</div>

					<Button
						onClick={handleSubmit}
						disabled={isSubmitting}
						className="mt-2 h-14 rounded-xl bg-[#4A63DD] text-base hover:bg-[#3E52BD] sm:text-lg"
					>
						{isSubmitting ? "Отправка..." : "Оставить заявку"}
					</Button>

					{submitMessage ? (
						<p className="text-sm text-muted-foreground">{submitMessage}</p>
					) : null}
				</div>
			),
		},
	]

	const total = slides.length

return (
        <section className="flex flex-col py-10 sm:py-14 lg:py-24">
            {/* ИСПРАВЛЕНО: Заменили lg:px-0 на lg:px-8 для безопасности на 11-13 дюймах */}
            <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-10 px-4 sm:gap-14 sm:px-6 lg:gap-16 lg:px-8">
                <div className="flex flex-col items-center gap-4 text-center">
                    <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                        Ответь на 5 вопросов и получи лучшее предложение среди всех провайдеров России
                    </h2>
                    <p className="max-w-4xl text-base leading-relaxed sm:text-xl lg:text-2xl text-foreground/80">
                        Подберем домашний интернет или телевидение с оформлением подключения на удобное тебе время!
                    </p>
                </div>

                <div className="overflow-visible rounded-[2rem] bg-white shadow-xl shadow-slate-200/60 border border-slate-100">
                    <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-8">
                        {/* Левая часть: добавили md:pr-4 для воздуха между колонками */}
                        <div className="flex flex-col justify-between gap-8 px-5 py-8 sm:px-8 sm:py-10 md:gap-12 md:py-14 md:pl-14 md:pr-4">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={slides[currentIndex].id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                    className="flex flex-col gap-8 md:gap-10 lg:gap-14"
                                >
                                    <h3 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                                        {slides[currentIndex].title}
                                    </h3>

                                    <div className="min-h-fit">
                                        {slides[currentIndex].left}
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 mt-4">
                                <Button
                                    onClick={() => goTo(currentIndex - 1)}
                                    disabled={currentIndex === 0}
                                    variant="outline"
                                    className="flex h-12 w-12 items-center justify-center rounded-full border-2"
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </Button>

                                <div className="flex items-center gap-3">
                                    {slides.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => goTo(i)}
                                            className={
                                                i === currentIndex
                                                    ? "h-3 w-8 rounded-full bg-primary transition-all"
                                                    : "h-3 w-3 rounded-full bg-muted hover:bg-slate-300 transition-all"
                                            }
                                        />
                                    ))}
                                </div>

                                <Button
                                    onClick={() => goTo(currentIndex + 1)}
                                    disabled={currentIndex === total - 1}
                                    className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg"
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>

                        {/* Правая часть: добавили md:pr-14 для симметрии отступов */}
                        <div className="relative flex min-h-[300px] items-end justify-center overflow-visible px-5 pb-8 sm:min-h-[380px] sm:px-8 sm:pb-10 md:min-h-0 md:justify-end md:pr-14 md:pb-14 md:pt-14">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={slides[currentIndex].id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.25 }}
                                    className="flex h-full w-full items-center justify-center md:justify-end"
                                >
                                    {slides[currentIndex].right ?? null}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}