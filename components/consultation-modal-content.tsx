"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { LeadForm } from "@/components/forms/lead-form"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ConsultationModalContent({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showClose={true}
        className="p-0 gap-0 max-w-md pt-12 px-6 pb-6 sm:px-8 sm:pb-8"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Book a Consultation</DialogTitle>
        </DialogHeader>
        <LeadForm />
      </DialogContent>
    </Dialog>
  )
}
