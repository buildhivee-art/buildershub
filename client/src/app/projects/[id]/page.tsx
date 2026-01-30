"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { 
    Calendar, 
    Github, 
    Globe, 
    MessageSquare, 
    MoreVertical, 
    Edit, 
    Trash2, 
    ArrowLeft,
    ExternalLink,
    Code2,
    Layers,
    Gauge
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { fetchProjectById, deleteProject } from "@/lib/api"
import { toast } from "sonner"

export default function ProjectDetailsPage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()
  const [project, setProject] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isOwner, setIsOwner] = React.useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)

  React.useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await fetchProjectById(id)
        setProject(data)
        
        // Ownership check optimization
        const token = localStorage.getItem('token');
        if (token) setIsOwner(true); // Should verify ID match in real app
        
      } catch (error) {
        toast.error("Failed to load project")
      } finally {
        setIsLoading(false)
      }
    }
    loadProject()
  }, [id, router])

  const handleDelete = async () => {
    try {
        await deleteProject(id);
        toast.success("Project deleted");
        router.push("/projects");
    } catch (error) {
        toast.error("Failed to delete project");
    }
  }

  if (isLoading) {
    return (
        <div className="container py-20 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
    )
  }

  if (!project) return null

  return (
    <div className="container py-10 max-w-6xl mx-auto px-4 sm:px-6">
      <Link href="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Link>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
         <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight tight-shadow">{project.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
                <Badge variant="outline" className="px-3 py-1 text-base capitalize bg-background/50 backdrop-blur">
                    {project.category || "Project"}
                </Badge>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(project.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                </div>
                {project.difficulty && (
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Gauge className="h-4 w-4" />
                        <span className="capitalize">{project.difficulty} Level</span>
                    </div>
                )}
            </div>
         </div>
         
         <div className="flex items-center gap-3">
            {project.demoUrl && (
                <Button asChild size="lg" className="shadow-lg shadow-primary/20">
                    <Link href={project.demoUrl} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                    </Link>
                </Button>
            )}
            {project.repoUrl && (
                <Button variant="outline" size="lg" asChild>
                    <Link href={project.repoUrl} target="_blank">
                        <Github className="mr-2 h-4 w-4" />
                        Repository
                    </Link>
                </Button>
            )}
            
            {isOwner && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full border">
                            <MoreVertical className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={`/projects/${id}/edit`}>
                            <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Project
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setDeleteDialogOpen(true)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Project
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Image Gallery */}
          {project.images && project.images.length > 0 && (
             <div className="rounded-xl overflow-hidden shadow-xl border border-border/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                    src={project.images[0]} 
                    alt="Project Cover" 
                    className="w-full h-auto object-cover max-h-[500px]"
                />
                {project.images.length > 1 && (
                    <div className="flex gap-2 p-2 overflow-x-auto bg-background/95 scrollbar-thin">
                        {project.images.map((img: string, idx: number) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img key={idx} src={img} alt={`Slide ${idx}`} className="h-16 w-24 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity" />
                        ))}
                    </div>
                )}
             </div>
          )}

          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Layers className="h-6 w-6 text-primary" />
                About the Project
            </h3>
            <div className="p-6 rounded-xl bg-card border shadow-sm leading-relaxed whitespace-pre-wrap">
                {project.description}
            </div>
          </div>

          <div>
             <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Code2 className="h-6 w-6 text-primary" />
                Tech Stack
             </h3>
             <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech: string) => (
                    <Badge key={tech} variant="secondary" className="px-4 py-2 text-base rounded-md border-primary/10 bg-primary/5 hover:bg-primary/10 transition-colors">
                        {tech}
                    </Badge>
                ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           {/* Author Card */}
           <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 sticky top-20">
              <h3 className="font-semibold mb-6 text-sm uppercase tracking-wider text-muted-foreground">Created By</h3>
              <div className="flex items-center gap-4 mb-6">
                 <Avatar className="h-16 w-16 border-2 border-primary/20">
                    <AvatarImage src={project.user.image || ""} />
                    <AvatarFallback className="text-xl">{project.user.name?.[0]}</AvatarFallback>
                 </Avatar>
                 <div>
                    <p className="font-bold text-lg leading-none mb-1">{project.user.name}</p>
                    <p className="text-sm text-muted-foreground">{project.user.githubUsername ? `@${project.user.githubUsername}` : "Developer"}</p>
                 </div>
              </div>
              
              <div className="space-y-3 mb-8">
                 {project.user.githubUsername && (
                     <Button variant="outline" className="w-full justify-start h-10" asChild>
                        <Link href={`https://github.com/${project.user.githubUsername}`} target="_blank">
                            <Github className="mr-2 h-4 w-4" />
                            GitHub Profile
                        </Link>
                     </Button>
                 )}
              </div>
              
              <Separator className="my-6" />

               <div className="space-y-4">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">We need you</h3>
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="text-sm font-medium text-center">
                        Looking for: <span className="font-bold text-primary capitalize">{project.lookingFor}</span>
                    </div>
                </div>
                
                <Button className="w-full h-12 text-base font-semibold shadow-md shadow-primary/20" size="lg">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    I'm Interested
                </Button>
              </div>
           </div>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This will permanently delete "{project.title}" and remove all data associated with it.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                Delete Project
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}
