import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface SummaryDialogProps {
  summaryText: string
  triggerText?: string
}

export default function SummaryDialog({ summaryText, triggerText = "Show Summary" }: SummaryDialogProps) {
  const [summaryPoints, setSummaryPoints] = useState<string[]>([])
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (summaryText) {
        const points = summaryText
        .split("<br>")
        .map(point => point.replace(/^-+\s*/, '').trim()) // Remove leading dash and spaces
        setSummaryPoints(points)
        setOpen(true)
    }
    }, [summaryText])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Summary</DialogTitle>
        </DialogHeader>
        <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
          {summaryPoints.length > 0 ? (
            summaryPoints.map((point, idx) => <li key={idx}>{point}</li>)
          ) : (
            <p className="text-muted-foreground">No summary available</p>
          )}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
