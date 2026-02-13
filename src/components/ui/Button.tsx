import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "mango";
    size?: "default" | "sm" | "lg" | "icon";
    withRipple?: boolean;
    withShimmer?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", withRipple = false, withShimmer = false, onClick, children, ...props }, ref) => {
        const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([]);

        const variants = {
            default: "bg-brand-green text-white hover:bg-brand-dark shadow-sm",
            destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
            outline: "border border-brand-green bg-transparent text-brand-green hover:bg-brand-light shadow-sm",
            secondary: "bg-brand-light text-brand-dark hover:bg-brand-light/80 shadow-sm",
            ghost: "hover:bg-brand-light hover:text-brand-dark",
            link: "text-brand-green underline-offset-4 hover:underline",
            mango: "bg-fruit-mango text-white hover:bg-fruit-mango/90 shadow-sm",
        };

        const sizes = {
            default: "h-10 px4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
        };

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (withRipple) {
                const button = e.currentTarget;
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const id = Date.now();

                setRipples((prev) => [...prev, { x, y, id }]);
                setTimeout(() => {
                    setRipples((prev) => prev.filter((r) => r.id !== id));
                }, 600);
            }
            onClick?.(e);
        };

        return (
            <motion.button
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
                    variants[variant],
                    sizes[size],
                    withShimmer && "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
                    className
                )}
                ref={ref}
                onClick={handleClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                {...(props as any)}
            >
                {children}
                {withRipple && ripples.map((ripple) => (
                    <span
                        key={ripple.id}
                        className="absolute rounded-full bg-white/40 animate-ripple"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            width: 0,
                            height: 0,
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                ))}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button };
