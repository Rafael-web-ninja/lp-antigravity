import React from 'react';
import { Leaf, Droplets, Snowflake, Zap } from 'lucide-react';

const Properties: React.FC = () => {
    const items = [
        { icon: Leaf, title: '100% Integral', desc: 'Apenas a fruta, nada mais.' },
        { icon: Droplets, title: 'Sem Açúcares', desc: 'Doçura natural da laranja.' },
        { icon: Snowflake, title: 'Prensado a Frio', desc: 'Preservando todos os nutrientes.' },
        { icon: Zap, title: 'Vitamina C', desc: 'Energia para o seu dia.' },
    ];

    return (
        <section className="py-24 bg-off-white text-dark-graphite" aria-label="Propriedades do Produto">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {items.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center space-y-4 p-6 hover:bg-white hover:shadow-lg transition-all rounded-2xl cursor-default group border border-transparent hover:border-gray-100">
                            <div className="p-4 bg-orange-50 rounded-full group-hover:bg-orange-vibrant transition-colors duration-300">
                                <item.icon className="w-8 h-8 text-orange-vibrant group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-bold">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Properties;
