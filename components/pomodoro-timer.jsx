"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    let interval = null

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            playSound()
            if (isBreak) {
              setMinutes(25)
              setIsBreak(false)
            } else {
              setMinutes(5)
              setIsBreak(true)
            }
            setIsActive(false)
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isActive, minutes, seconds, isBreak])

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setMinutes(25)
    setSeconds(0)
    setIsBreak(false)
  }

  const totalSeconds = isBreak ? 5 * 60 : 25 * 60
  const elapsedSeconds = (isBreak ? 5 * 60 : 25 * 60) - (minutes * 60 + seconds)
  const progress = (elapsedSeconds / totalSeconds) * 100

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">{isBreak ? "☕ Break Time" : "⏱️ Focus Time"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="relative w-64 h-64 mx-auto">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted-foreground opacity-20"
            />
            <motion.circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-primary"
              strokeDasharray={`${2 * Math.PI * 120}`}
              strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
              strokeLinecap="round"
              initial={{ strokeDashoffset: 2 * Math.PI * 120 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 120 * (1 - progress / 100) }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button size="lg" onClick={toggleTimer}>
            {isActive ? "⏸️ Pause" : "▶️ Start"}
          </Button>
          <Button size="lg" variant="outline" onClick={resetTimer}>
            🔄 Reset
          </Button>
        </div>

        <audio
          ref={audioRef}
          src="data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA=="
        />
      </CardContent>
    </Card>
  )
}
