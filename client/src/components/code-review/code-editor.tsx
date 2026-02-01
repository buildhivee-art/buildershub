"use client"

import * as React from "react"
import Editor from "@monaco-editor/react"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  height?: string
}

export default function CodeEditor({ value, onChange, language, height = "500px" }: CodeEditorProps) {
  return (
    <div className="border rounded-md overflow-hidden shadow-sm h-full">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={(value) => onChange(value || "")}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
        }}
      />
    </div>
  )
}
