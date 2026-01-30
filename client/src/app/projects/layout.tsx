"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 w-full relative">
            {/* 
               If we wanted a mobile trigger, we'd add it here.
               Usually SidebarProvider expects a layout or we manually place the Trigger
             */}
             <div className="md:hidden p-4 border-b">
                 <SidebarTrigger />
             </div>
            {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
