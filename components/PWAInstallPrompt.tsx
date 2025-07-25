"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt")
        } else {
          console.log("User dismissed the install prompt")
        }
        setDeferredPrompt(null)
        setShowPrompt(false)
      })
    }
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 right-4 bg-[#1E1E1E] border border-[#00FFFF] p-4 rounded-lg shadow-lg z-50"
        >
          <p className="text-[#EAEAEA] mb-2">Install Korean AI Learner app for a better experience!</p>
          <div className="flex justify-end space-x-2">
            <Button
              onClick={() => setShowPrompt(false)}
              variant="ghost"
              className="text-[#EAEAEA] hover:text-[#00FFFF]"
            >
              Not now
            </Button>
            <Button onClick={handleInstall} className="bg-[#00FFFF] text-[#121212] hover:bg-[#1ABC9C]">
              Install
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
