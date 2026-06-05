"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        /* ИСПРАВЛЕНО: Более аккуратные шаги размера. 
           spacing(9) - мобилки, 
           spacing(10.5) - планшеты (11 дюймов), 
           spacing(13) - только на больших экранах (lg) */
        "bg-background group/calendar p-2 sm:p-4 md:p-6 w-full flex justify-center",
        "[--cell-size:--spacing(9)] sm:[--cell-size:--spacing(10.5)] lg:[--cell-size:--spacing(13)]",
        "[[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-full max-h-full", defaultClassNames.root),
        months: cn(
          "flex gap-2 sm:gap-4 flex-col md:flex-row relative w-full items-center justify-center",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-2 sm:gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        caption_label: cn(
          "select-none font-semibold text-sm sm:text-base lg:text-xl",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex justify-between w-full mb-1", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-md flex-1 font-medium select-none text-[10px] sm:text-xs lg:text-sm text-center uppercase",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-1 justify-between gap-0.5 sm:gap-1", defaultClassNames.week),
        day: cn(
          "relative p-0 text-center group/day aspect-square select-none min-w-(--cell-size) flex-1 flex justify-center items-center",
          defaultClassNames.day
        ),
        today: cn(
          "bg-accent text-accent-foreground rounded-md",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground/30 aria-selected:text-muted-foreground/30",
          defaultClassNames.outside
        ),
        ...classNames,
      }}
      components={{
        Chevron: ({ className, orientation, ...props }) => {
          const sizeClass = "size-4 sm:size-5 lg:size-6";
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn(sizeClass, className)} {...props} />
            )
          }
          if (orientation === "right") {
            return (
              <ChevronRightIcon className={cn(sizeClass, className)} {...props} />
            )
          }
          return (
            <ChevronDownIcon className={cn(sizeClass, className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()
  void day

  return (
    <Button
      variant="ghost"
      size="icon"
      data-selected={modifiers.selected}
      className={cn(
        "data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground transition-all duration-200",
        "flex aspect-square size-auto w-full min-w-(--cell-size) items-center justify-center leading-none font-normal rounded-md",
        "text-[12px] sm:text-sm lg:text-lg", 
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }