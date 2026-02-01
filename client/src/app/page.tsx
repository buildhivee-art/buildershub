"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Code2, Users, Rocket, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/layout/footer"

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }
  const token = localStorage.getItem("token")

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/10 selection:text-primary">
      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-40 lg:pt-48 lg:pb-48">
          <div className="container px-4 mx-auto relative z-10">
              <motion.div 
                className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                   <div className="inline-flex items-center rounded-full border bg-background/50 backdrop-blur-sm px-3 py-1 text-sm text-foreground/80 shadow-sm mb-6 transition-colors hover:bg-background/80">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    BuildHive v1.0 is live
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </div>
                  <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-4">
                    Your code needs a <br className="hidden md:block"/>
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-primary via-orange-400 to-amber-500">
                      perfect community
                    </span>
                  </h1>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                    <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
                        The modern platform for developers to collaborate on side-projects, share work, and grow together. Stop building alone.
                    </p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/projects">
                    <Button size="lg" className="h-14 px-8 rounded-full text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                      Explore Projects
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-base border-primary/20 bg-primary/5 hover:bg-primary/10">
                      Collaborate Now
                    </Button>
                  </Link>
                </motion.div>

                {/* Social Proof / Stats */}
                <motion.div variants={itemVariants} className="pt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground/80">
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-foreground text-xl">100+</span>
                        <span>Projects</span>
                    </div>
                    <div className="h-8 w-px bg-border/50" />
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-foreground text-xl">500+</span>
                        <span>Developers</span>
                    </div>
                    <div className="h-8 w-px bg-border/50" />
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-foreground text-xl">Free</span>
                        <span>Forever</span>
                    </div>
                </motion.div>
              </motion.div>
          </div>
          
          {/* Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[130px] rounded-full opacity-30 -z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything you need to ship</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                 Stop building in isolation. BuildHive gives you the tools to find the perfect squad and manage your projects effortlessly.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              <motion.div 
                whileHover={{ y: -5 }} 
                className="relative group overflow-hidden rounded-2xl border bg-background p-8 hover:shadow-lg transition-all"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Team Matching</h3>
                <p className="text-muted-foreground">
                  Our AI-driven algorithm matches you with developers who have complementary skills and shared interests.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }} 
                className="relative group overflow-hidden rounded-2xl border bg-background p-8 hover:shadow-lg transition-all"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Rocket className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Project Launchpad</h3>
                <p className="text-muted-foreground">
                  From idea to MVP. Use our built-in templates and project management tools to keep your team on track.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }} 
                className="relative group overflow-hidden rounded-2xl border bg-background p-8 hover:shadow-lg transition-all"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Code2 className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Smart Portfolio</h3>
                <p className="text-muted-foreground">
                  Showcase your contributions automatically. We sync with GitHub to build a dynamic portfolio of your work.
                </p>
              </motion.div>
            </div>
          </div>

        </section>

        {/* AI Code Review Feature Section */}
        <section className="py-20 bg-blue-50/50 dark:bg-blue-950/10 border-y">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center rounded-lg bg-blue-100 dark:bg-blue-900 px-3 py-1 text-sm text-blue-800 dark:text-blue-100 mb-4">
                            New Feature
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
                            AI-Powered Code Reviews
                        </h2>
                        <p className="text-muted-foreground mb-6 text-lg">
                            Get instant feedback on your code quality. Our AI reviews for bugs,
                            security issues, performance problems, and suggests improvements.
                        </p>
                        <ul className="space-y-3 mb-8">
                            {[
                                "Deep static code analysis for bugs",
                                "Actionable refactoring suggestions",
                                "Curated learning resources",
                                "Support for 12+ popular languages"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <div className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span className="text-muted-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <Link href="/code-review">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">Try Code Review Now →</Button>
                        </Link>
                    </div>
                    <div className="relative h-[400px] border rounded-xl overflow-hidden shadow-2xl bg-background">
                         {/* Mockup of code review interface */}
                         <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/50">
                             <div className="flex gap-1.5">
                                 <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                 <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                                 <div className="w-3 h-3 rounded-full bg-green-400/80" />
                             </div>
                         </div>
                         <div className="p-6 space-y-4">
                             <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                             <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
                             <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 mt-6">
                                 <div className="flex items-center gap-2 mb-2">
                                     <div className="h-4 w-4 bg-blue-500 rounded-full" />
                                     <div className="h-4 w-32 bg-blue-200 dark:bg-blue-800 rounded" />
                                 </div>
                                 <div className="h-16 w-full bg-blue-100 dark:bg-blue-900/50 rounded" />
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Benefits / List Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6 mx-auto">
             <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 relative h-[400px] rounded-2xl overflow-hidden border bg-muted/50">
                    {/* Placeholder for a UI screenshot or feature demo */}
                   <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      UI Dashboard Mockup
                   </div>
                </div>
                <div className="order-1 lg:order-2 space-y-8">
                   <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Focus on code, not logistics</h2>
                   <ul className="space-y-4">
                      {[
                        "Instant project setup with best-practice templates",
                        "Integrated chat and video conferencing for teams",
                        "Automated task distribution based on commits",
                        "One-click deployment integrations"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                           <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                           <span className="text-lg text-muted-foreground">{item}</span>
                        </li>
                      ))}
                   </ul>
                   <Button size="lg" variant="secondary">See how it works</Button>
                </div>
             </div>
          </div>
        </section>

        {/* CTA Section */}
        {!token && 
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
           <div className="container px-4 md:px-6 mx-auto relative z-10 text-center space-y-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to build your dream project?</h2>
              <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                 Join thousands of developers turning ideas into reality today.
              </p>
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-semibold bg-background text-foreground hover:bg-background/90">
                  Join BuildHive Now
                </Button>
              </Link>
           </div>
        </section>
        }
      </main>
      <Footer />
    </div>
  )
}
