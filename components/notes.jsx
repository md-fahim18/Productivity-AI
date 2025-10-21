"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Save, Plus, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Notes() {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState({ id: null, title: "", content: "" })

  useEffect(() => {
    const savedNotes = localStorage.getItem("productivity-notes")
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  const saveNotes = (updatedNotes) => {
    localStorage.setItem("productivity-notes", JSON.stringify(updatedNotes))
    setNotes(updatedNotes)
  }

  const handleSaveNote = () => {
    if (!currentNote.title.trim() && !currentNote.content.trim()) return

    if (currentNote.id) {
      const updatedNotes = notes.map((note) => (note.id === currentNote.id ? currentNote : note))
      saveNotes(updatedNotes)
    } else {
      const newNote = {
        ...currentNote,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      }
      saveNotes([...notes, newNote])
    }

    setCurrentNote({ id: null, title: "", content: "" })
  }

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id)
    saveNotes(updatedNotes)
    if (currentNote.id === id) {
      setCurrentNote({ id: null, title: "", content: "" })
    }
  }

  const handleNewNote = () => {
    setCurrentNote({ id: null, title: "", content: "" })
  }

  const handleSelectNote = (note) => {
    setCurrentNote(note)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Notes</CardTitle>
          <Button size="sm" onClick={handleNewNote}>
            <Plus className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
          <AnimatePresence>
            {notes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  currentNote.id === note.id ? "bg-primary/10 border-primary" : "hover:bg-secondary/50"
                }`}
                onClick={() => handleSelectNote(note)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{note.title || "Untitled Note"}</h4>
                    <p className="text-sm text-muted-foreground truncate">{note.content}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteNote(note.id)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {notes.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No notes yet. Create your first note!</p>
          )}
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>{currentNote.id ? "Edit Note" : "New Note"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Note title..."
            value={currentNote.title}
            onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
          />
          <Textarea
            placeholder="Start writing your note..."
            value={currentNote.content}
            onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
            className="min-h-[400px] resize-none"
          />
          <Button onClick={handleSaveNote} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Note
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
