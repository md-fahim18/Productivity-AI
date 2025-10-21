"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { motion } from "framer-motion"

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]")
    setTasks(savedTasks)
    setNotes(savedNotes)
  }, [])

  const completedTasks = tasks.filter((t) => t.completed).length
  const totalTasks = tasks.length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const pieData = [
    { name: "Completed", value: completedTasks, color: "rgb(var(--color-chart-1))" },
    { name: "Pending", value: totalTasks - completedTasks, color: "rgb(var(--color-chart-2))" },
  ]

  const weeklyData = [
    { day: "Mon", completed: 5 },
    { day: "Tue", completed: 8 },
    { day: "Wed", completed: 6 },
    { day: "Thu", completed: 9 },
    { day: "Fri", completed: 7 },
    { day: "Sat", completed: 4 },
    { day: "Sun", completed: 3 },
  ]

  /* Replaced lucide-react icons with Unicode symbols */
  const stats = [
    { title: "Total Tasks", value: totalTasks, icon: "✓", color: "text-blue-500" },
    { title: "Completed", value: completedTasks, icon: "📈", color: "text-green-500" },
    { title: "Notes", value: notes.length, icon: "📝", color: "text-purple-500" },
    { title: "Completion Rate", value: `${completionRate}%`, icon: "⏱️", color: "text-orange-500" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="rounded-lg">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl sm:text-3xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <span className="text-3xl sm:text-4xl flex-shrink-0">{stat.icon}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="rounded-lg">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-base">Task Completion</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-base">Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--color-border))" />
                <XAxis dataKey="day" stroke="rgb(var(--color-muted-foreground))" fontSize={12} />
                <YAxis stroke="rgb(var(--color-muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgb(var(--color-card))",
                    border: "1px solid rgb(var(--color-border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="completed" fill="rgb(var(--color-chart-1))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
