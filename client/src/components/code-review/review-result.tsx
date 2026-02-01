"use client"

import * as React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, AlertTriangle, Info, Lightbulb, ExternalLink } from "lucide-react"
import { CodeReviewResult } from "@/lib/codeReviewApi"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

interface ReviewResultProps {
  result: CodeReviewResult
}

const severityConfig = {
  critical: {
    icon: AlertCircle,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-900/50",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    border: "border-yellow-200 dark:border-yellow-900/50",
  },
  info: {
    icon: Info,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-900/50",
  },
}

export default function ReviewResult({ result }: ReviewResultProps) {
  const scoreColor =
    result.score >= 80 ? "text-green-600" : result.score >= 60 ? "text-yellow-600" : "text-red-600"

  return (
    <div className="space-y-6">
      {/* Score */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Code Quality Score</h3>
        <div className="flex items-center gap-4">
          <div className={`text-5xl font-bold ${scoreColor}`}>{result.score}</div>
          <div className="flex-1 space-y-2">
            <Progress value={result.score} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {result.score >= 80 && "Excellent code quality!"}
              {result.score >= 60 && result.score < 80 && "Good, but room for improvement"}
              {result.score < 60 && "Needs significant improvements"}
            </p>
          </div>
        </div>
      </Card>

      {/* Issues */}
      {result.issues && result.issues.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Issues Found ({result.issues.length})</h3>
          <div className="space-y-3">
            {result.issues.map((issue, index) => {
              const config = severityConfig[issue.severity] || severityConfig.info
              const Icon = config.icon

              return (
                <Alert key={index} className={`${config.bg} ${config.border}`}>
                  <Icon className={`h-4 w-4 ${config.color}`} />
                  <AlertTitle className="flex items-center gap-2">
                    {issue.title}
                    <Badge variant="outline" className={`${config.color} border-current`}>
                      {issue.severity}
                    </Badge>
                    {issue.line && (
                      <Badge variant="secondary">Line {issue.line}</Badge>
                    )}
                  </AlertTitle>
                  <AlertDescription className="mt-2 text-foreground/90">
                    <p className="mb-2">{issue.description}</p>
                    {issue.suggestion && (
                      <div className="mt-3 p-3 bg-background/50 rounded border">
                        <p className="text-sm font-medium mb-1 flex items-center gap-1">
                            <Lightbulb className="h-3 w-3" /> Suggestion:
                        </p>
                        <p className="text-sm">{issue.suggestion}</p>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )
            })}
          </div>
        </div>
      )}

      <Separator />

      {/* Suggestions */}
      {result.suggestions && result.suggestions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Improvement Suggestions ({result.suggestions.length})
          </h3>
          <div className="space-y-4">
            {result.suggestions.map((suggestion, index) => (
              <Card key={index} className="p-4 overflow-hidden">
                <h4 className="font-medium mb-2">{suggestion.title}</h4>
                <p className="text-muted-foreground text-sm mb-3">{suggestion.description}</p>
                {suggestion.code && (
                  <div className="rounded overflow-hidden text-xs">
                    <SyntaxHighlighter
                      language="javascript" // Default to js for highlighting if unknown
                      style={vscDarkPlus}
                      customStyle={{ margin: 0 }}
                      wrapLongLines
                    >
                      {suggestion.code}
                    </SyntaxHighlighter>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Resources */}
      {result.resources && result.resources.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Learning Resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 border rounded-lg hover:bg-accent transition-colors group"
              >
                <ExternalLink className="h-4 w-4 text-primary group-hover:text-primary/80" />
                <span className="text-primary hover:underline truncate">{resource.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
