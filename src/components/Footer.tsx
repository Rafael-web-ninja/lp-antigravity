import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark-graphite text-off-white py-32 px-6">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-12">
                <h2 className="text-5xl md:text-7xl font-bold text-center tracking-tight">Sinta a pureza.</h2>
                <MagneticButton>
                    Compre Agora
                </MagneticButton>
                <div className="flex space-x-8 text-sm opacity-50 mt-12 pt-12 border-t border-white/10 w-full justify-center">
                    <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
                    <a href="#" className="hover:opacity-100 transition-opacity">Twitter</a>
                    <a href="#" className="hover:opacity-100 transition-opacity">Contato</a>
                </div>
                <p className="text-xs opacity-30">© 2024 Orange Silk. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

const MagneticButton = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x: x * 0.3, y: y * 0.3 });
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    }

    const { x, y } = position;

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="group relative px-10 py-5 bg-orange-vibrant text-white text-xl font-bold rounded-full overflow-hidden shadow-lg hover:shadow-orange-vibrant/50 transition-shadow duration-300"
        >
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </motion.button>
    )
}

export default Footer;
