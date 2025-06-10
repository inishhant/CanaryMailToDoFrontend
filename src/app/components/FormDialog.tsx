import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ReactNode } from "react"

type FormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  buttonTitle: string
  dialogTitle?: string
  dialogDescription?: string
  children: ReactNode
  footer?: ReactNode
}

export function FormDialog({
  open,
  onOpenChange,
  buttonTitle,
  dialogTitle,
  dialogDescription,
  children,
  footer,
}: FormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">{buttonTitle}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {(dialogTitle || dialogDescription) && (
          <DialogHeader>
            {dialogTitle && <DialogTitle>{dialogTitle}</DialogTitle>}
            {dialogDescription && (
              <DialogDescription>{dialogDescription}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}
