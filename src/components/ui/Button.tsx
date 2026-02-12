import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "mango"
    size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {

        const variants = {
            default: "bg-brand-green text-white hover:bg-brand-dark shadow-sm",
            destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
            outline: "border border-brand-green bg-transparent text-brand-green hover:bg-brand-light shadow-sm",
            secondary: "bg-brand-light text-brand-dark hover:bg-brand-light/80 shadow-sm",
            ghost: "hover:bg-brand-light hover:text-brand-dark",
            link: "text-brand-green underline-offset-4 hover:underline",
            mango: "bg-fruit-mango text-white hover:bg-fruit-mango/90 shadow-sm",
        }

        const sizes = {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
        }

        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
