import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
    variant?: 'warm' | 'cool' | 'vibrant' | 'sunset';
    className?: string;
}

const gradients = {
    warm: 'linear-gradient(135deg, #FF9F1C 0%, #FF6B35 50%, #F7931E 100%)',
    cool: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    vibrant: 'linear-gradient(135deg, #fa709a 0%, #fee140 50%, #30cfd0 100%)',
    sunset: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ee5a6f 100%)'
};

export const AnimatedBackground = ({
    variant = 'warm',
    className = ''
}: AnimatedBackgroundProps) => {
    return (
        <motion.div
            className={`absolute inset-0 -z-10 ${className}`}
            style={{
                background: gradients[variant],
                backgroundSize: '200% 200%'
            }}
            animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear'
            }}
        />
    );
};
