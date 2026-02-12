import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Import all mango frames
const mangoFramesRaw = import.meta.glob('../../assets/mango-frames/*.jpg', { eager: true, as: 'url' });
const appleFramesRaw = import.meta.glob('../../assets/apple-frames/*.jpg', { eager: true, as: 'url' });

const sortFrames = (frames: Record<string, string>) => {
    return Object.values(frames).sort((a, b) => {
        // Extract numbers from filenames to sort correctly (e.g. frame-1.jpg vs frame-10.jpg)
        const getNum = (str: string) => parseInt(str.match(/(\d+)/)?.[0] || '0');
        return getNum(a.split('/').pop() || '') - getNum(b.split('/').pop() || '');
    });
};

const frameSets = {
    mango: sortFrames(mangoFramesRaw),
    apple: sortFrames(appleFramesRaw)
};

type FruitType = 'mango' | 'apple';

const content = {
    mango: {
        tagline: "100% Natural • Handcrafted • Fresh",
        title: <>Freshness You Can Feel, <br /><span className="text-[#FF9F1C]">Flavors You'll Love!</span></>,
        description: "Experience the magic of our signature <span class='font-semibold text-white'>Fruit Bombs</span> - real fruit ice creams served inside the fruit shell.",
        accentColor: "text-[#FF9F1C]"
    },
    apple: {
        tagline: "Crisp • Sweet • Refreshing",
        title: <>Nature's Candy, <br /><span className="text-[#ff4e50]">Frozen to Perfection!</span></>,
        description: "Indulge in the crisp sweetness of our <span class='font-semibold text-white'>Apple Fruit Bomb</span> - a refreshing delight in every bite.",
        accentColor: "text-[#ff4e50]"
    }
};

export const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentFruit, setCurrentFruit] = useState<FruitType>('mango');
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, frameSets[currentFruit].length - 1]);

    // Preload images when fruit changes
    useEffect(() => {
        setIsLoaded(false);
        const loadedImages: HTMLImageElement[] = [];
        const paths = frameSets[currentFruit];

        let loadedCount = 0;

        paths.forEach((path) => {
            const img = new Image();
            img.src = path;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === paths.length) {
                    setIsLoaded(true);
                }
            };
            loadedImages.push(img);
        });

        // Use a functional update or just set them. 
        // Since we are replacing the whole array, direct set is fine.
        setImages(loadedImages);

        // Fallback: if images are cached, onload might have fired already or we just want to ensure we start rendering
        if (paths.length > 0) setIsLoaded(true);

    }, [currentFruit]);

    // Render frame on canvas
    useEffect(() => {
        const render = (index: number) => {
            const canvas = canvasRef.current;
            const context = canvas?.getContext('2d');
            const img = images[index];

            if (canvas && context) {
                // Handle high DPI displays
                const dpr = window.devicePixelRatio || 1;
                const rect = canvas.getBoundingClientRect();

                // Ensure canvas buffer matches display size
                if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
                    canvas.width = rect.width * dpr;
                    canvas.height = rect.height * dpr;
                    context.scale(dpr, dpr);
                }

                // Clear canvas
                context.clearRect(0, 0, rect.width, rect.height);

                if (img && img.complete) {
                    // Calculate aspect ratios to "cover" the screen (fills the canvas)
                    const imgAspect = img.width / img.height;
                    const canvasAspect = rect.width / rect.height;

                    let drawWidth, drawHeight, offsetX, offsetY;

                    if (imgAspect > canvasAspect) {
                        // Image is wider relative to canvas -> match height, crop width
                        drawHeight = rect.height;
                        drawWidth = rect.height * imgAspect;
                        offsetX = (rect.width - drawWidth) / 2;
                        offsetY = 0;
                    } else {
                        // Image is taller relative to canvas -> match width, crop height
                        drawWidth = rect.width;
                        drawHeight = rect.width / imgAspect;
                        offsetX = 0;
                        offsetY = (rect.height - drawHeight) / 2;
                    }

                    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                }
            }
        };

        const unsubscribe = currentIndex.on("change", (latest) => {
            const index = Math.min(Math.round(latest), images.length - 1);
            if (index >= 0) requestAnimationFrame(() => render(index));
        });

        // Initial render loop to catch when the first image loads
        const initialRender = () => {
            // Try rendering the first frame (or current index if scrolled)
            const latest = currentIndex.get();
            const index = Math.min(Math.round(latest), images.length - 1);
            if (index >= 0) render(index);
        };

        if (images.length > 0) {
            initialRender();
            // Force a re-render after a short delay to ensure image loading is caught if onload missed
            setTimeout(initialRender, 100);
        }

        return () => unsubscribe();
    }, [currentIndex, isLoaded, images]);

    const toggleFruit = () => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        setCurrentFruit(prev => prev === 'mango' ? 'apple' : 'mango');
    };

    const currentContent = content[currentFruit];

    return (
        <section ref={sectionRef} className="relative h-[500vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">

                    {/* Text Content */}
                    <div className="absolute z-20 text-center px-4 max-w-5xl mx-auto top-[15%] md:top-[15%] drop-shadow-lg transition-all duration-500">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentFruit}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <span className="inline-block py-1 px-4 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 text-sm font-medium mb-6 tracking-wide">
                                    {currentContent.tagline}
                                </span>
                                <h1 className="text-5xl md:text-8xl font-bold font-heading text-white leading-[1.1] mb-8 tracking-tight">
                                    {currentContent.title}
                                </h1>
                                <p
                                    className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: currentContent.description }}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Canvas for Animation */}
                    <canvas
                        ref={canvasRef}
                        className="relative w-full h-full object-cover z-10"
                    />

                    {/* Placeholder Image (First Frame) - Visible while canvas loads or as fallback */}
                    <img
                        src={frameSets[currentFruit][0]}
                        alt="Hero Background"
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    />
                </div>

                {/* Navigation Buttons - Left/Right Arrows */}
                <button
                    onClick={toggleFruit}
                    className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all border border-white/20 group"
                    aria-label={currentFruit === 'mango' ? "Next: Apple" : "Next: Mango"}
                >
                    <ChevronRight className="w-8 h-8 opacity-80 group-hover:opacity-100" />
                </button>

                <button
                    onClick={toggleFruit}
                    className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all border border-white/20 group"
                    aria-label={currentFruit === 'mango' ? "Prev: Apple" : "Prev: Mango"}
                >
                    <ChevronLeft className="w-8 h-8 opacity-80 group-hover:opacity-100" />
                </button>


                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/80 z-20 flex flex-col items-center gap-2"
                >
                    <span className="text-xs font-medium uppercase tracking-widest opacity-80">Scroll</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                </motion.div>
            </div>
        </section>
    );
};
