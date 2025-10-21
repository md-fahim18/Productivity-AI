"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Sidebar from "@/components/sidebar"
import Dashboard from "@/components/dashboard"
import TaskManager from "@/components/task-manager"
import PomodoroTimer from "@/components/pomodoro-timer"
import Notes from "@/components/notes"
import QuoteGenerator from "@/components/quote-generator"
import ContactForm from "@/components/contact-form"

export default function Home() {
  const [activeView, setActiveView] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />
      case "tasks":
        return <TaskManager />
      case "pomodoro":
        return <PomodoroTimer />
      case "notes":
        return <Notes />
      case "quotes":
        return <QuoteGenerator />
      case "contact":
        return <ContactForm />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <main className="flex-1 flex flex-col overflow-hidden w-full">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-4 md:px-8 py-4">
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg flex-shrink-0"
            >
              {sidebarOpen ? "✕" : "☰"}
            </button>
            <h1 className="text-lg md:text-2xl font-bold text-foreground truncate">
              {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
            </h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto w-full">
          <div className="p-4 md:p-8 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}
