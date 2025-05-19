"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Share2, Copy, Printer, Download, X, Eye, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const CV_FILES = [
  {
    id: "1YOUR_FILE_ID_1",
    title: "Professional CV (PDF)",
    type: "pdf",
    downloadUrl: "https://drive.google.com/file/d/1boLXIlo5l9he-8aR9qqeLKGPwPHhVXur/view?usp=sharing",
    previewUrl: "https://drive.google.com/file/d/1boLXIlo5l9he-8aR9qqeLKGPwPHhVXur/view?usp=sharing",
    date: "2024-2025"
  },
  // {
  //   id: "1YOUR_FILE_ID_2",
  //   title: "Simple Resume (PDF)",
  //   type: "pdf",
  //   downloadUrl: "https://drive.google.com/uc?id=1YOUR_FILE_ID_2&export=download",
  //   previewUrl: "https://drive.google.com/file/d/1YOUR_FILE_ID_2/preview",
  //   date: "2024"
  // }
];

export default function ContentPress() {
  const [isOpen, setIsOpen] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [activeCV, setActiveCV] = useState(CV_FILES[0])
  const { toast } = useToast()

  interface CVFile {
    id: string;
    title: string;
    type: string;
    downloadUrl: string;
    previewUrl: string;
    date: string;
  }

  const handleDownload = (cv: CVFile): void => {
    try {
      const link: HTMLAnchorElement = document.createElement('a');
      link.href = cv.downloadUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Download started!",
        description: `${cv.title} is being downloaded.`,
      });
    } catch (err: unknown) {
      toast({
        title: "Download failed",
        description: "Please try again or use the preview.",
        variant: "destructive",
      });
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied!",
        description: "CV page URL copied to clipboard.",
      })
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the URL manually.",
        variant: "destructive",
      })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating Action Button - Left positioned */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg p-0 flex items-center justify-center"
          aria-label="CV Controls"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </motion.div>

      {/* Controls Popup - Left aligned */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 left-6 z-50 w-64 rounded-xl bg-background border shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
          >
            <div className="bg-primary p-3 flex justify-between items-center">
              <h3 className="text-primary-foreground font-medium">CV Controls</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-7 w-7 rounded-full bg-background/20 hover:bg-background/30 text-primary-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-3 space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => setShowPreview(true)}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview CV
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={handleCopyLink}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CV Preview Modal remains centered */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-[95vw] h-[90vh] sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>CV Preview</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col h-full gap-4">
            <div className="flex-1 relative overflow-hidden rounded-lg border">
              <iframe
                src={activeCV.previewUrl}
                className="w-full h-full absolute top-0 left-0"
                frameBorder="0"
                title="CV Preview"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CV_FILES.map((cv) => (
                <Card 
                  key={cv.id}
                  className={`cursor-pointer transition-all ${activeCV.id === cv.id ? 'border-primary' : ''}`}
                  onClick={() => setActiveCV(cv)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{cv.title}</h4>
                      <Badge variant="outline" className="mt-1">
                        {cv.type.toUpperCase()}
                      </Badge>
                    </div>
                    <Button 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDownload(cv)
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}