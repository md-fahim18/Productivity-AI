"use client"

import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "tasks", label: "Tasks", icon: "✓" },
  { id: "pomodoro", label: "Pomodoro", icon: "⏱️" },
  { id: "notes", label: "Notes", icon: "📝" },
  { id: "quotes", label: "Quotes", icon: "✨" },
  { id: "contact", label: "Contact", icon: "✉️" },
]

export default function Sidebar({ activeView, setActiveView, isOpen, onClose, theme }) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`fixed inset-0 z-40 md:hidden ${theme === "light" ? "bg-white/70" : "bg-black/70"}`}
              onClick={onClose}
            />

            <motion.aside
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed left-0 top-0 z-50 h-screen w-64 border-r border-border bg-card md:static md:z-auto"
            >
              <div className="flex h-full flex-col">
                <div className="border-b border-border p-6">
                  <h2 className="text-xl font-bold text-primary">AI Productivity</h2>
                  <p className="text-sm text-muted-foreground">Your smart workspace</p>
                </div>

                <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
                  {menuItems.map((item) => {
                    const isActive = activeView === item.id

                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => {
                          setActiveView(item.id)
                          onClose()
                        }}
                        className={cn(
                          "relative w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute inset-0 rounded-lg bg-primary"
                            style={{ zIndex: -1 }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </motion.button>
                    )
                  })}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <aside className="hidden md:flex w-64 border-r border-border bg-card flex-col flex-shrink-0">
        <div className="border-b border-border p-6">
          <h2 className="text-xl font-bold text-primary">AI Productivity</h2>
          <p className="text-sm text-muted-foreground">Your smart workspace</p>
        </div>

        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = activeView === item.id

            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={cn(
                  "relative w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-lg bg-primary"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
