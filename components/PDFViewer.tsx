"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from "lucide-react"
import { fetchPDFThroughProxy } from "@/api/pdfProxy"

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

interface PDFViewerProps {
  url: string
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url }) => {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState<number>(1.0)
  const [pdfData, setPdfData] = useState<Uint8Array | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const data = await fetchPDFThroughProxy(url)
        setPdfData(data)
      } catch (error) {
        console.error("Error fetching PDF:", error)
        toast({
          title: "Error Loading PDF",
          description: "An error occurred while loading the PDF",
          variant: "destructive",
        })
      }
    }

    fetchPDF()
  }, [url, toast])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
    setPageNumber(1)
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset
      return newPageNumber >= 1 && newPageNumber <= numPages ? newPageNumber : prevPageNumber
    })
  }

  function zoomIn() {
    setScale((prevScale) => Math.min(prevScale + 0.1, 2.0))
  }

  function zoomOut() {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5))
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = "document.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(downloadUrl)

      toast({
        title: "Download started",
        description: "Your PDF is being downloaded",
      })
    } catch (error) {
      console.error("Error downloading PDF:", error)
      toast({
        title: "Download Failed",
        description: "An error occurred while downloading the PDF",
        variant: "destructive",
      })
    }
  }

  if (!pdfData) {
    return <div className="text-center">Loading PDF...</div>
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
        <Button onClick={() => changePage(-1)} disabled={pageNumber <= 1}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm sm:text-base">{`Page ${pageNumber} of ${numPages}`}</span>
        <Button onClick={() => changePage(1)} disabled={pageNumber >= numPages}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button onClick={zoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button onClick={zoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
      <div className="border border-gray-300 shadow-lg max-w-full overflow-x-auto">
        <Document
          file={pdfData}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => {
            console.error("Error loading PDF:", error)
            toast({
              title: "Error Loading PDF",
              description: "An error occurred while loading the PDF",
              variant: "destructive",
            })
          }}
          loading={<div className="text-center">Loading PDF...</div>}
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            width={Math.min(typeof window !== "undefined" ? window.innerWidth * 0.9 : 800, 800)}
          />
        </Document>
      </div>
    </div>
  )
}

export default PDFViewer
