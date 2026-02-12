import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Storytelling: React.FC = () => {
    return (
        <section className="relative py-40 bg-off-white px-6 min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Element for "Juice" feel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-vibrant rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse-slow pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <p className="text-4xl md:text-6xl lg:text-7xl font-bold text-dark-graphite leading-snug text-center flex flex-wrap justify-center gap-x-3 gap-y-1">
                    <Word>Do</Word> <Word>pomar</Word> <Word>direto</Word> <Word>para</Word> <Word>a</Word> <Word>sua</Word> <Word>mesa,</Word>
                    <Word>preservando</Word> <Word>cada</Word> <Word highlight>nutriente</Word> <Word highlight>essencial.</Word>
                    <Word>Nossas</Word> <Word>laranjas</Word> <Word>são</Word> <Word>colhidas</Word> <Word>manualmente</Word> <Word>no</Word>
                    <Word highlight>auge</Word> <Word highlight>da</Word> <Word highlight>maturação,</Word>
                    <Word>garantindo</Word> <Word>um</Word> <Word>sabor</Word> <Word>inigualável</Word> <Word>e</Word> <Word>uma</Word>
                    <Word highlight>explosão</Word> <Word highlight>de</Word> <Word highlight>frescor.</Word>
                    <Word>Sem</Word> <Word>aditivos,</Word> <Word>sem</Word> <Word>conservantes,</Word>
                    <Word>apenas</Word> <Word>a</Word> <Word>mais</Word> <Word>pura</Word> <Word highlight>essência</Word> <Word highlight>da</Word> <Word highlight>fruta.</Word>
                </p>
            </div>
        </section>
    )
}

const Word = ({ children, highlight = false }: { children: string, highlight?: boolean }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.8", "start 0.5"]
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [20, 0]);

    return (
        <motion.span
            ref={ref}
            style={{ opacity, y }}
            className={`transition-colors duration-300 ${highlight ? 'text-orange-vibrant' : ''}`}
        >
            {children}
        </motion.span>
    )
}

export default Storytelling;
