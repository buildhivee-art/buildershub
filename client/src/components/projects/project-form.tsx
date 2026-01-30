"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { Loader2, Plus, Trash, Link as LinkIcon, Github } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TechStackSelect } from "./tech-stack-select"
import { createProject, updateProject } from "@/lib/api"

const projectSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  description: z.string().min(20, "Description must be at least 20 characters").max(2000),
  techStack: z.array(z.string()).min(1, "Select at least one technology"),
  lookingFor: z.string().min(1, "Please select what you are looking for"),
  status: z.enum(["open", "closed", "in-progress"]).optional(),
  images: z.array(z.string().url("Invalid URL")).optional(),
  demoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  repoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  difficulty: z.string().optional(),
  category: z.string().optional(),
})

type ProjectFormValues = z.infer<typeof projectSchema>

interface ProjectFormProps {
  initialData?: ProjectFormValues & { id?: string }
  mode?: "create" | "edit"
}

export function ProjectForm({ initialData, mode = "create" }: ProjectFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [imageInput, setImageInput] = useState("")

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      techStack: [],
      lookingFor: "",
      status: "open",
      images: [],
      demoUrl: "",
      repoUrl: "",
      difficulty: "Intermediate",
      category: "Web Development"
    },
  })

  // Helper to add image URL to array
  const addImage = () => {
    if (!imageInput) return;
    try {
        new URL(imageInput); // Basic validation
        const currentImages = form.getValues("images") || [];
        form.setValue("images", [...currentImages, imageInput]);
        setImageInput("");
    } catch {
        toast.error("Please enter a valid URL");
    }
  }

  const removeImage = (index: number) => {
      const currentImages = form.getValues("images") || [];
      form.setValue("images", currentImages.filter((_, i) => i !== index));
  }

  async function onSubmit(data: ProjectFormValues) {
    setIsLoading(true)
    try {
      if (mode === "create") {
         const newProject = await createProject(data);
         toast.success("Project created successfully!");
         router.push(`/projects/${newProject.id}`);
      } else if (mode === "edit" && initialData?.id) {
         await updateProject(initialData.id, data);
         toast.success("Project updated successfully!");
         router.push(`/projects/${initialData.id}`);
      }
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g. BuildHive" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                
                <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="Web Development">Web Development</SelectItem>
                        <SelectItem value="Mobile App">Mobile App</SelectItem>
                        <SelectItem value="AI/ML">AI/ML</SelectItem>
                        <SelectItem value="Game Development">Game Development</SelectItem>
                        <SelectItem value="Blockchain">Blockchain</SelectItem>
                        <SelectItem value="IoT">IoT</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            
            <div className="space-y-8">
                <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Difficulty Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Level" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                        <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                    control={form.control}
                    name="lookingFor"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Looking For</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="frontend">Frontend Developers</SelectItem>
                            <SelectItem value="backend">Backend Developers</SelectItem>
                            <SelectItem value="fullstack">Fullstack Developers</SelectItem>
                            <SelectItem value="designer">UI/UX Designers</SelectItem>
                            <SelectItem value="mobile">Mobile Developers</SelectItem>
                            <SelectItem value="mentor">Mentors</SelectItem>
                            <SelectItem value="co-founder">Co-founder</SelectItem>
                            <SelectItem value="any">Anyone interested</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your project, what it does, and what help you need..." 
                  className="min-h-[150px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="techStack"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tech Stack</FormLabel>
              <FormControl>
                <TechStackSelect 
                   selected={field.value} 
                   onChange={field.onChange} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* URLs */}
        <div className="grid md:grid-cols-2 gap-8">
             <FormField
                control={form.control}
                name="demoUrl"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Demo URL (Optional)</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="https://..." className="pl-9" {...field} />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
             />
             <FormField
                control={form.control}
                name="repoUrl"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Repository URL (Optional)</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="https://github.com/..." className="pl-9" {...field} />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
             />
        </div>

        {/* Image Upload Handled simply as URL input list for now */}
        <div className="space-y-4">
            <FormLabel>Project Images (URLs)</FormLabel>
            <div className="flex gap-2">
                <Input 
                    placeholder="https://example.com/image.png" 
                    value={imageInput} 
                    onChange={(e) => setImageInput(e.target.value)}
                />
                <Button type="button" variant="secondary" onClick={addImage}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
                {form.watch("images")?.map((url, idx) => (
                    <div key={idx} className="relative group w-32 h-20 rounded-md overflow-hidden bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt="project preview" className="object-cover w-full h-full" />
                        <button 
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white rounded-full p-1"
                        >
                            <Trash className="h-3 w-3" />
                        </button>
                    </div>
                ))}
            </div>
        </div>


        {mode === "edit" && (
            <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="open">Open (Looking for contributors)</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {mode === "create" ? "Create Project" : "Update Project"}
        </Button>
      </form>
    </Form>
  )
}
