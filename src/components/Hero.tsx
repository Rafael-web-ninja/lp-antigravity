import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Load images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            for (let i = 1; i <= 35; i++) {
                const img = new Image();
                img.src = `/imgs/juice-${String(i).padStart(3, '0')}.png`;
                await new Promise((resolve) => {
                    img.onload = () => resolve(img);
                    img.onerror = () => {
                        console.error(`Failed to load image ${i}`);
                        resolve(img); // Resolve anyway to proceed
                    }
                });
                loadedImages.push(img);
            }
            setImages(loadedImages);
        };
        loadImages();
    }, []);

    // Sync canvas with scroll
    useEffect(() => {
        const render = (latest: number) => {
            if (!canvasRef.current || images.length === 0) return;
            const ctx = canvasRef.current.getContext('2d');
            if (!ctx) return;

            const frameIndex = Math.min(
                Math.floor(latest * (images.length - 1)),
                images.length - 1
            );

            const img = images[frameIndex];
            if (!img) return;

            // Set canvas dimensions to window size (or parent)
            // Ideally handled by resize observer, but this is simple enough for now
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;

            // Calculate 'cover' fill
            const scale = Math.max(canvasRef.current.width / img.width, canvasRef.current.height / img.height);
            const x = (canvasRef.current.width / 2) - (img.width / 2) * scale;
            const y = (canvasRef.current.height / 2) - (img.height / 2) * scale;

            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        };

        const unsubscribe = scrollYProgress.on("change", render);

        // Initial render
        // We also need to re-render on resize, so maybe add listener
        const handleResize = () => render(scrollYProgress.get());
        window.addEventListener('resize', handleResize);

        // Render initial frame if images loaded
        if (images.length > 0) render(scrollYProgress.get());

        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
        };
    }, [scrollYProgress, images]);

    // Trigger initial render when images ready
    useEffect(() => {
        if (images.length > 0 && canvasRef.current) {
            // Force update 
            // We can just rely on the effect above if we trigger a change or just call it?
            // Actually the effect above depends on images, so it re-runs when images change.
            // It calls render(scrollYProgress.get()) inside.
        }
    }, [images]);


    return (
        <div ref={containerRef} className="h-[400vh] relative bg-off-white">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3, 0.4, 0.6], [0, 1, 1, 0]), y: useTransform(scrollYProgress, [0.1, 0.4], [50, 0]) }}
                        className="z-10"
                    >
                        <h1 className="text-6xl md:text-9xl font-black text-dark-graphite text-center tracking-tighter shadow-sm">
                            A Natureza <br /> em cada gota
                        </h1>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
