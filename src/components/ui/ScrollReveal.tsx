import { motion, useInView, UseInViewOptions, Variants } from 'framer-motion';
import { useRef, ReactNode, Children } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    width?: "fit-content" | "100%";
    mode?: "fade-up" | "fade-in" | "slide-in-right" | "slide-in-left" | "pop" | "rotate-in" | "scale-fade" | "blur-in";
    delay?: number;
    duration?: number;
    className?: string;
    viewport?: UseInViewOptions;
    staggerChildren?: boolean;
    staggerDelay?: number;
}

export const ScrollReveal = ({
    children,
    width = "fit-content",
    mode = "fade-up",
    delay = 0,
    duration = 0.5,
    className = "",
    viewport = { once: true, margin: "-50px" },
    staggerChildren = false,
    staggerDelay = 0.1
}: ScrollRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, viewport);

    const getVariants = (): Variants => {
        switch (mode) {
            case "fade-in":
                return {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                };
            case "slide-in-right":
                return {
                    hidden: { opacity: 0, x: 75 },
                    visible: { opacity: 1, x: 0 }
                };
            case "slide-in-left":
                return {
                    hidden: { opacity: 0, x: -75 },
                    visible: { opacity: 1, x: 0 }
                };
            case "pop":
                return {
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                };
            case "rotate-in":
                return {
                    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
                    visible: { opacity: 1, rotate: 0, scale: 1 }
                };
            case "scale-fade":
                return {
                    hidden: { opacity: 0, scale: 0.5 },
                    visible: { opacity: 1, scale: 1 }
                };
            case "blur-in":
                return {
                    hidden: { opacity: 0, filter: "blur(10px)" },
                    visible: { opacity: 1, filter: "blur(0px)" }
                };
            case "fade-up":
            default:
                return {
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                };
        }
    };

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerChildren ? staggerDelay : 0
            }
        }
    };

    if (staggerChildren) {
        const childrenArray = Children.toArray(children);
        return (
            <div ref={ref} className={className} style={{ width }}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {childrenArray.map((child, index) => (
                        <motion.div
                            key={index}
                            variants={getVariants()}
                            transition={{ duration, delay, ease: "easeOut" }}
                        >
                            {child}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        );
    }

    return (
        <div ref={ref} className={className} style={{ width }}>
            <motion.div
                variants={getVariants()}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration, delay, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
};
