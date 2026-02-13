import { useTransform, useScroll, MotionValue } from 'framer-motion';
import { RefObject } from 'react';

interface ParallaxOptions {
    speed?: number;
    offset?: [string, string];
}

export const useParallax = (
    ref: RefObject<HTMLElement>,
    options: ParallaxOptions = {}
): MotionValue<number> => {
    const { speed = 0.5, offset = ['start end', 'end start'] } = options;

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: offset as any,
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

    return y;
};
