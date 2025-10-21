"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { RefreshCw, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const fallbackQuotes = [
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  {
    content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { content: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { content: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  {
    content: "Success is not how high you have climbed, but how you make a positive difference to the world.",
    author: "Roy T. Bennett",
  },
  { content: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { content: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { content: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
]

export default function QuoteGenerator() {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [useFallback, setUseFallback] = useState(false)

  const fetchQuote = async () => {
    setLoading(true)
    try {
      // Try to fetch from API first
      const response = await fetch("https://api.quotable.io/random")
      if (!response.ok) throw new Error("API request failed")
      const data = await response.json()
      setQuote(data)
      setUseFallback(false)
    } catch (error) {
      console.log("[v0] API fetch failed, using fallback quotes")
      // Use fallback quotes if API fails
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)]
      setQuote(randomQuote)
      setUseFallback(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Daily Inspiration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <RefreshCw className="h-8 w-8 text-primary" />
              </motion.div>
            </div>
          ) : quote ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <blockquote className="text-2xl font-medium leading-relaxed text-foreground">
                "{quote.content}"
              </blockquote>
              <p className="text-lg text-muted-foreground">— {quote.author}</p>
            </motion.div>
          ) : null}

          <Button onClick={fetchQuote} disabled={loading} className="w-full" size="lg">
            <RefreshCw className="mr-2 h-4 w-4" />
            Get New Quote
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quote Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {["Motivational", "Inspirational", "Success", "Wisdom", "Life", "Happiness"].map((category) => (
              <Button key={category} variant="outline" className="justify-start bg-transparent" onClick={fetchQuote}>
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
