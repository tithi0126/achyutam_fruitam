import { motion, useInView, UseInViewOptions } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    width?: "fit-content" | "100%";
    mode?: "fade-up" | "fade-in" | "slide-in-right" | "slide-in-left" | "pop";
    delay?: number;
    duration?: number;
    className?: string;
    viewport?: UseInViewOptions;
}

export const ScrollReveal = ({
    children,
    width = "fit-content",
    mode = "fade-up",
    delay = 0,
    duration = 0.5,
    className = "",
    viewport = { once: true, margin: "-50px" }
}: ScrollRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, viewport);

    const getVariants = () => {
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
            case "fade-up":
            default:
                return {
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                };
        }
    };

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
