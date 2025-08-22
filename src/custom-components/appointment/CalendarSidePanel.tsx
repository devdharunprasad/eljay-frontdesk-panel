import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  UsersRound,
  X,
  Circle,
  Plus,
} from "lucide-react"
import clsx from "clsx"

type Stat = {
  key: "today" | "overdue" | "pending" | "done"
  label: string
  value: number
  color: string // tailwind class for dot + progress
}

const statsSeed: Stat[] = [
  { key: "today",   label: "TODAY",   value: 0, color: "bg-red-500" },
  { key: "overdue", label: "OVERDUE", value: 9, color: "bg-orange-500" },
  { key: "pending", label: "PENDING", value: 2, color: "bg-blue-500" },
  { key: "done",    label: "DONE",    value: 2, color: "bg-emerald-500" },
]

export default function App() {
  // compute “percent” bars relative to the largest bucket (like the screenshot)
  const computed = useMemo(() => {
    const max = Math.max(...statsSeed.map(s => s.value), 1)
    return statsSeed.map(s => ({ ...s, pct: Math.round((s.value / max) * 100) }))
  }, [])

  return (
    <div className="min-h-screen w-full bg-muted/20 flex items-start justify-end p-6">
      {/* Right-side panel */}
      <Card className="w-[420px] max-w-full h-[92vh] overflow-hidden shadow-lg border rounded-2xl bg-background">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-2xl font-semibold">Tasks &amp; Analytics</h1>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Close">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Body (scrollable) */}
        <div className="h-[calc(92vh-4rem-84px)] overflow-y-auto px-6 py-4 space-y-5">
          {/* Add Walk-in Appointment */}
          <Button
            className="w-full h-12 gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl"
          >
            <UsersRound className="h-5 w-5" />
            Add Walk-in Appointment
          </Button>

          {/* Link row */}
          <button
            className="w-full flex items-center justify-between py-3"
            onClick={() => null}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                {/* simple avatar-style icon */}
                <UsersRound className="h-5 w-5 opacity-70" />
              </span>
              <span className="text-base font-medium">Audiologist Overview</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>

          <Separator />

          {/* Task View header row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                <CalendarDays className="h-5 w-5 opacity-80" />
              </span>
              <span className="text-lg font-semibold">Task View</span>
            </div>

            <Button
              variant="outline"
              className="rounded-full px-4 py-1 h-8 text-sm"
            >
              Today
            </Button>
          </div>

          {/* Date selector */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="text-xl font-semibold">Today</div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="space-y-3">
            {computed.map((s) => (
              <StatRow key={s.key} label={s.label} value={s.value} pct={s.pct} colorClass={s.color} />
            ))}
          </div>

          <Separator />

          {/* Tasks for Today */}
          <div className="space-y-2">
            <div className="text-lg font-semibold">Tasks for Today (0)</div>
            <EmptyState />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <Button
            variant="outline"
            className="w-full h-12 rounded-xl gap-2 text-base"
          >
            <Plus className="h-5 w-5" />
            Add New Task
          </Button>
        </div>
      </Card>
    </div>
  )
}

function StatRow({
  label,
  value,
  pct,
  colorClass,
}: {
  label: string
  value: number
  pct: number
  colorClass: string
}) {
  return (
    <div className="grid grid-cols-[auto,1fr,auto] items-center gap-4">
      <div className="flex items-center gap-2 w-24">
        <Circle className={clsx("h-3 w-3", colorToRing(colorClass))} />
        <span className="text-sm font-medium text-muted-foreground tracking-wide">{label}</span>
      </div>

      <div className="relative">
        {/* bg track */}
        <div className="h-2 rounded-full bg-muted" />
        {/* value bar on top using Progress so it’s accessible */}
        <div className="absolute inset-0 flex items-center">
          <Progress value={pct} className={clsx("h-2", roundedProgress(), colorToBg(colorClass))} />
        </div>
      </div>

      <div className="w-6 text-right tabular-nums text-base">{value}</div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border bg-muted/10 py-12">
      <div className="text-lg font-medium text-muted-foreground">No tasks for this day</div>
      <div className="text-sm text-muted-foreground mt-1">Enjoy your free time!</div>
    </div>
  )
}

/** helpers to keep the shadcn Progress rounded & colored nicely */
function roundedProgress() {
  return "rounded-full [&>div]:rounded-full"
}
function colorToBg(color: string) {
  // map "bg-*-500" to both background + track tint
  return `${color} [&>div]:${color}`
}
function colorToRing(color: string) {
  // Turn lucide Circle into a filled dot using stroke + fill
  return `${color} fill-current`
}
