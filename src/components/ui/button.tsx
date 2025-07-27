import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Ocean-themed variants for the game
        ocean: "bg-ocean-mid text-foreground border-2 border-ocean-light/30 hover:bg-ocean-light hover:border-accent hover:shadow-coral hover:scale-105 active:scale-95",
        wave: "bg-gradient-to-r from-ocean-mid to-ocean-light text-foreground border border-wave-foam/20 hover:from-ocean-light hover:to-accent hover:shadow-ocean hover:scale-105 active:scale-95",
        coral: "bg-gradient-coral text-foreground hover:shadow-coral hover:scale-105 active:scale-95",
        choice: "bg-card/50 backdrop-blur-sm text-card-foreground border border-ocean-light/30 hover:bg-ocean-light/20 hover:border-accent hover:shadow-ocean hover:scale-[1.02] active:scale-95",
        pacific: "bg-background/5 backdrop-blur-sm text-cyan-400 border-2 border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 font-semibold tracking-wide",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        choice: "h-auto min-h-16 px-6 py-4 text-base",
        hero: "h-14 px-8 py-4 text-lg font-semibold",
        pacific: "h-16 px-10 py-5 text-xl font-bold tracking-wider",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
