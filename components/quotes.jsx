"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Quote } from "lucide-react"
import { motion } from "framer-motion"

export default function Quotes() {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchQuote = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://api.quotable.io/random")
      const data = await response.json()
      setQuote(data)
    } catch (error) {
      console.error("Error fetching quote:", error)
      setQuote({
        content: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Quote className="h-5 w-5" />
          Daily Inspiration
        </CardTitle>
        <Button size="sm" variant="outline" onClick={fetchQuote} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {quote ? (
          <motion.div
            key={quote.content}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <blockquote className="text-2xl font-serif italic text-center leading-relaxed">
              "{quote.content}"
            </blockquote>
            <p className="text-right text-muted-foreground font-medium">— {quote.author}</p>
          </motion.div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">Loading inspiration...</div>
        )}
      </CardContent>
    </Card>
  )
}
