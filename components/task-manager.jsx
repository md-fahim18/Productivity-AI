"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { motion, AnimatePresence } from "framer-motion"

export default function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    setTasks(savedTasks)
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask("")
    }
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const startEdit = (task) => {
    setEditingId(task.id)
    setEditText(task.text)
  }

  const saveEdit = () => {
    setTasks(tasks.map((task) => (task.id === editingId ? { ...task, text: editText } : task)))
    setEditingId(null)
    setEditText("")
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Manager</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 flex-col sm:flex-row">
          <Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
            className="flex-1"
          />
          <Button onClick={addTask} className="w-full sm:w-auto">
            ➕ Add
          </Button>
        </div>

        <div className="space-y-2">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-secondary flex-wrap sm:flex-nowrap"
              >
                <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />

                {editingId === task.id ? (
                  <>
                    <Input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 min-w-0"
                      autoFocus
                    />
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button size="icon" variant="ghost" onClick={saveEdit} className="flex-1 sm:flex-none">
                        ✓
                      </Button>
                      <Button size="icon" variant="ghost" onClick={cancelEdit} className="flex-1 sm:flex-none">
                        ✕
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <span
                      className={`flex-1 min-w-0 break-words ${task.completed ? "line-through text-muted-foreground" : ""}`}
                    >
                      {task.text}
                    </span>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button size="icon" variant="ghost" onClick={() => startEdit(task)}>
                        ✎
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => deleteTask(task.id)}>
                        🗑️
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {tasks.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No tasks yet. Add one to get started!</p>
        )}
      </CardContent>
    </Card>
  )
}
