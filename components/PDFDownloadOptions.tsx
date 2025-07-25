import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface PDFDownloadOptionsProps {
  onDownload: () => void
  lessonTitle: string
}

export function PDFDownloadOptions({ onDownload, lessonTitle }: PDFDownloadOptionsProps) {
  return (
    <Button onClick={onDownload} variant="outline">
      <Download className="mr-2 h-4 w-4" />
      Download PDF
    </Button>
  )
}
