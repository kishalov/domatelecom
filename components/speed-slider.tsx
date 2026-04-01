"use client"

import { useRef, useState } from "react"

const POINTS = [
  { percent: 20, label: "100 мб/сек", pos: "bottom" },
  { percent: 40, label: "200 мб/сек", pos: "top" },
  { percent: 60, label: "500 мб/сек", pos: "bottom" },
  { percent: 80, label: "750 мб/сек", pos: "top" },
  { percent: 100, label: "1000 мб/сек", pos: "bottom" },
]

const STEP_VALUES = POINTS.map(p => p.percent)

export function SpeedSlider({
  value = 20,
  onChange,
}: {
  value?: number
  onChange?: (v: number) => void
}) {
  const [current, setCurrent] = useState(value)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const dragState = useRef({ dragging: false })

  function nearestStep(rawPercent: number) {
    let closest = STEP_VALUES[0]
    let min = Infinity

    for (const step of STEP_VALUES) {
      const d = Math.abs(step - rawPercent)
      if (d < min) {
        min = d
        closest = step
      }
    }
    return closest
  }

  function update(clientX: number) {
    const track = trackRef.current
    if (!track) return

    const rect = track.getBoundingClientRect()
    let ratio = (clientX - rect.left) / rect.width
    ratio = Math.max(0, Math.min(1, ratio))

    const rawPercent = ratio * 100
    const snap = nearestStep(rawPercent)

    setCurrent(snap)
    onChange?.(snap)
  }

  function onPointerDownThumb(e: React.PointerEvent) {
    e.preventDefault()
    dragState.current.dragging = true
    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)
  }

  function onPointerMove(e: PointerEvent) {
    if (!dragState.current.dragging) return
    update(e.clientX)
  }

  function onPointerUp() {
    dragState.current.dragging = false
    window.removeEventListener("pointermove", onPointerMove)
    window.removeEventListener("pointerup", onPointerUp)
  }

  function onPointerDownTrack(e: React.PointerEvent) {
    update(e.clientX)
  }

  return (
    <div className="relative w-full h-[120px]">
      <div
        ref={trackRef}
        onPointerDown={onPointerDownTrack}
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 
			h-[20px] bg-[#D9D9D9] rounded-full cursor-pointer"
      >
        <div
          className="absolute top-0 left-0 h-full bg-[#495FCD] rounded-full"
          style={{ width: `${current}%` }}
        />

        {POINTS.map(
          (p, i) =>
            p.percent !== 100 && (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 
					bg-black w-[5px] h-[30px]"
                style={{ left: `${p.percent}%` }}
              />
            )
        )}

        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 
				cursor-pointer flex items-center justify-center"
          style={{ left: `${current}%` }}
          onPointerDown={onPointerDownThumb}
        >
          <div className="w-[15px] h-[40px] bg-[#495FCD] rounded-full" />
        </div>
      </div>

      {POINTS.map((p, i) => (
        <div
          key={i}
          className={`absolute text-sm whitespace-nowrap ${
            p.pos === "top" ? "top-2" : "bottom-2"
          } -translate-x-1/2`}
          style={{ left: `${p.percent}%` }}
        >
          {p.label}
        </div>
      ))}
    </div>
  )
}
