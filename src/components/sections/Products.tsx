import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '../ui/ScrollReveal';
// import { Button } from '../ui/button';

// Zomato Menu Images
import apple from '../../assets/menu/apple_fruit_bomb.jpg';
import guava from '../../assets/menu/guava_fruit_bomb.jpeg';
import mango from '../../assets/menu/mango_fruit_bomb.jpeg';
import muskmelon from '../../assets/menu/muskmelon_fruit_bomb.jpeg';
import mixFruit from '../../assets/menu/mix_fruit_ice_cream.jpg';
import jamun from '../../assets/menu/jamun_fruit_ice_cream.jpeg';
import kesarPista from '../../assets/menu/kesar_pista_ice_cream.jpg';
import lotus from '../../assets/menu/lotus_biscoff_bliss_shake.png';
import mawaMalai from '../../assets/menu/mawa_malai_kulfi.png';

// Mock Data (Updated from Zomato)
const products = [
    { id: 1, name: "Apple Fruit Bomb", category: "Fruit Bomb", image: apple, description: "A burst of fruity flavors in every bite, delightful combination of fresh apples." },
    { id: 2, name: "Guava Fruit Bomb", category: "Fruit Bomb", image: guava, description: "A burst of tropical flavors, transporting your taste buds to paradise." },
    { id: 3, name: "Mango Fruit Bomb", category: "Fruit Bomb", image: mango, description: "Indulge in a burst of fruity goodness with this tantalizing explosion of mango flavors." },
    { id: 4, name: "Muskmelon Fruit Bomb", category: "Fruit Bomb", image: muskmelon, description: "Indulge in an explosion of fresh muskmelon flavors with this delightful real fruit treat." },
    { id: 5, name: "Mix Fruit Ice Cream", category: "Seasonal", image: mixFruit, description: "A delightful combination of various real fruits blended into a refreshing frozen treat." },
    { id: 6, name: "Jamun Fruit Ice Cream", category: "Seasonal", image: jamun, description: "Luscious real fruit ice cream bursting with rich, sweet and tart flavors of fresh Jamun." },
    { id: 7, name: "Kesar Pista Ice Cream", category: "Traditional", image: kesarPista, description: "Delightful and refreshing real fruit ice cream bursting with rich flavors of saffron and pistachios." },
    { id: 8, name: "Lotus Biscoff Bliss Shake", category: "Shakes", image: lotus, description: "A thick, cookie packed shake exploding with biscoff flavor. Creamy, biscoff swirl." },
    { id: 9, name: "Mawa Malai Kulfi", category: "Kulfi", image: mawaMalai, description: "Traditional favorite made with thickened milk and rich mawa. Smooth, dense, and creamy." },
];

const categories = ["All", "Fruit Bomb", "Traditional", "Seasonal", "Shakes", "Kulfi"];

export const Products = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProducts = activeCategory === "All"
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <section id="products" className="py-24 bg-[#FFF8F0]">
            <div className="container mx-auto px-4">
                <ScrollReveal width="100%" className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-brand-dark">Our Menu</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Explore our wide range of handcrafted delights. Freshly updated from our store.</p>
                </ScrollReveal>

                {/* Filters */}
                <ScrollReveal width="100%" delay={0.2} className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                ? "bg-brand-green text-white shadow-md"
                                : "bg-white text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </ScrollReveal>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map(product => (
                            <motion.div
                                layout
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className="h-64 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <span className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-dark uppercase tracking-wide">
                                        {product.category}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold font-heading mb-2 text-brand-dark">{product.name}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{product.description}</p>
                                    <button className="w-full py-2 border border-brand-green text-brand-green rounded hover:bg-brand-green hover:text-white transition-colors text-sm">
                                        View Details
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};
