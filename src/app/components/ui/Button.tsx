import { cn } from "../../lib/utils"
import { Slot } from "@radix-ui/react-slot"
import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "outline" | "destructive" | "ghost"
  size?: "default" | "sm" | "lg"
  isLoading?: boolean
  icon?: React.ReactNode
}

const buttonVariants = {
  // REMOVED focus:ring-2 and focus:ring-offset-2
  base: "inline-flex items-center justify-center rounded-2xl font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none curson-pointer",
  variant: {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 hover:bg-gray-100",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    ghost: "hover:bg-gray-100",
  },
  size: {
    default: "h-10 px-4 py-2 text-base",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-6 text-lg",
  },
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", isLoading, icon, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          buttonVariants.base,
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <span className="mr-2 h-4 w-4 animate-spin" />}
        {icon && !isLoading && <span className="mr-2">{icon}</span>}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"