"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useConsultationModal } from "@/components/consultation-modal"

export function HeroCTAs() {
  const { openModal } = useConsultationModal()

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Button
        size="lg"
        onClick={openModal}
        className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base tracking-wide group"
      >
        Begin Your Transformation
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
      <Button
        asChild
        variant="outline"
        size="lg"
        className="border-foreground/30 text-foreground hover:bg-foreground/5 px-8 py-6 text-base tracking-wide bg-transparent"
      >
        <Link href="#services">Explore Our Services</Link>
      </Button>
    </div>
  )
}
