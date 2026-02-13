import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, X } from 'lucide-react';
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
import orange from '../../assets/orange.png';
import pomegranate from '../../assets/pomogranate.png';
import strawberry from '../../assets/strawberry.png';
import custardApple from '../../assets/custard.png';
import chocolate from '../../assets/chocolate.png';
import soon from '../../assets/Coming Soon.png';
import kiwi from '../../assets/kiwi.png';
import imli from '../../assets/imli.png';
import pineapple from '../../assets/pineapple.png';

// Mock Data (Updated from Zomato)
// Complete Menu with Pricing
const products = [
    // Natural Fruit Bombs (₹190-₹280)
    { id: 1, name: "Mango Fruit Bomb", category: "Fruit Bomb", price: "₹250", image: mango, description: "Indulge in a burst of fruity goodness with this tantalizing explosion of mango flavors." },
    { id: 2, name: "Pomegranate Fruit Bomb", category: "Fruit Bomb", price: "₹190", image: guava, description: "A burst of antioxidant-rich pomegranate flavors in every bite." },
    { id: 3, name: "Orange Fruit Bomb", category: "Fruit Bomb", price: "₹190", image: orange, description: "Refreshing citrus explosion bursting with vitamin C and tangy goodness." },
    { id: 4, name: "Apple Fruit Bomb", category: "Fruit Bomb", price: "₹190", image: apple, description: "A burst of fruity flavors in every bite, delightful combination of fresh apples." },
    { id: 5, name: "Musk Melon Fruit Bomb", category: "Fruit Bomb", price: "₹190", image: muskmelon, description: "Indulge in an explosion of fresh muskmelon flavors with this delightful real fruit treat." },
    { id: 6, name: "Guava Fruit Bomb", category: "Fruit Bomb", price: "₹190", image: guava, description: "A burst of tropical flavors, transporting your taste buds to paradise." },

    // Real Fruit Ice Cream - ₹90 Category
    { id: 7, name: "Mulberry Ice Cream", category: "Premium", price: "₹90", image: soon, description: "Rich and creamy mulberry flavored ice cream." },
    { id: 8, name: "Custard Apple Ice Cream", category: "Premium", price: "₹90", image: custardApple, description: "Smooth custard apple ice cream with natural sweetness." },
    { id: 9, name: "Strawberry Ice Cream", category: "Premium", price: "₹90", image: strawberry, description: "Fresh strawberry ice cream bursting with berry flavor." },
    { id: 10, name: "Coconut Ice Cream", category: "Premium", price: "₹90", image: soon, description: "Tropical coconut ice cream with real coconut pieces." },
    { id: 11, name: "Guava Ice Cream", category: "Premium", price: "₹90", image: guava, description: "Natural guava ice cream with authentic fruit taste." },
    { id: 12, name: "Chocolate Ice Cream", category: "Premium", price: "₹90", image: chocolate, description: "Rich and decadent chocolate ice cream." },
    { id: 13, name: "Cookies Cream Ice Cream", category: "Premium", price: "₹90", image: soon, description: "Creamy vanilla ice cream loaded with cookie pieces." },
    { id: 14, name: "Kesar Pista Ice Cream", category: "Premium", price: "₹90", image: kesarPista, description: "Traditional saffron and pistachio flavored ice cream." },
    { id: 15, name: "Kaju Gulkand Ice Cream", category: "Premium", price: "₹90", image: soon, description: "Cashew and rose petal preserve ice cream." },
    { id: 16, name: "Pan Masala Ice Cream", category: "Premium", price: "₹90", image: soon, description: "Unique betel leaf flavored ice cream." },
    { id: 17, name: "Kaju Katli Ice Cream", category: "Premium", price: "₹90", image: soon, description: "Cashew fudge inspired ice cream." },
    { id: 18, name: "Shakarteti Ice Cream", category: "Premium", price: "₹90", image: soon, description: "Sweet and indulgent shakarteti flavored ice cream." },
    { id: 19, name: "Badam Katli Ice Cream", category: "Premium", price: "₹90", image: soon, description: "Almond fudge inspired ice cream." },

    // Real Fruit Ice Cream - ₹80 Category
    { id: 20, name: "Jamun Ice Cream", category: "Classic", price: "₹80", image: jamun, description: "Luscious real fruit ice cream bursting with jamun flavors." },
    { id: 21, name: "Kiwi Ice Cream", category: "Classic", price: "₹80", image: kiwi, description: "Tangy and sweet kiwi flavored ice cream." },
    { id: 22, name: "Imli Ice Cream", category: "Classic", price: "₹80", image: imli, description: "Unique tamarind flavored ice cream with sweet-sour taste." },
    { id: 23, name: "Chikoo Ice Cream", category: "Classic", price: "₹80", image: soon, description: "Naturally sweet sapota ice cream." },
    { id: 24, name: "Mango Ice Cream", category: "Classic", price: "₹80", image: mango, description: "Classic mango ice cream made with real fruit." },
    { id: 25, name: "Pineapple Ice Cream", category: "Classic", price: "₹80", image: pineapple, description: "Tropical pineapple ice cream with tangy notes." },
    { id: 26, name: "Pomegranate Ice Cream", category: "Classic", price: "₹80", image: pomegranate, description: "Refreshing pomegranate flavored ice cream." },
    { id: 27, name: "Orange Ice Cream", category: "Classic", price: "₹80", image: orange, description: "Zesty orange ice cream with citrus burst." },

    // Mix Dish & Berries
    { id: 28, name: "Mix Dish", category: "Special", price: "₹120", image: mixFruit, description: "A delightful combination of various real fruits." },
    { id: 29, name: "Rasp Berry Ice Cream", category: "Special", price: "₹120", image: soon, description: "Premium raspberry ice cream with intense berry flavor." },
    { id: 30, name: "Pista Katli Ice Cream", category: "Special", price: "₹120", image: kesarPista, description: "Pistachio fudge inspired ice cream." },
    { id: 31, name: "Blue Berry Ice Cream", category: "Special", price: "₹120", image: soon, description: "Rich blueberry ice cream packed with antioxidants." },

    // Popsicles/Sticks - ₹50
    { id: 32, name: "Mango Stick", category: "Popsicles", price: "₹50", image: soon, description: "Refreshing mango ice cream on a stick." },
    { id: 33, name: "Chocolate Stick", category: "Popsicles", price: "₹50", image: soon, description: "Classic chocolate ice cream on a stick." },
    { id: 34, name: "Strawberry Stick", category: "Popsicles", price: "₹50", image: soon, description: "Sweet strawberry ice cream on a stick." },
    { id: 35, name: "Mava Malai Stick", category: "Popsicles", price: "₹50", image: mawaMalai, description: "Traditional mava malai ice cream on a stick." },

    // Add existing items from Zomato menu
    // { id: 36, name: "Lotus Biscoff Bliss Shake", category: "Shakes", price: "₹120", image: lotus, description: "A thick, cookie packed shake exploding with biscoff flavor." },
    // { id: 37, name: "Mawa Malai Kulfi", category: "Kulfi", price: "₹80", image: mawaMalai, description: "Traditional favorite made with thickened milk and rich mawa." },
];

const categories = ["All", "Fruit Bomb", "Premium", "Classic", "Special", "Popsicles", "Shakes", "Kulfi"];

interface ProductsProps {
    limit?: number;
    showViewAll?: boolean;
    categoryCount?: number;
}

export const Products = ({ limit, showViewAll = false, categoryCount }: ProductsProps = {}) => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [openCategories, setOpenCategories] = useState<string[]>([]);

    const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

    const filteredProducts = activeCategory === "All"
        ? products
        : products.filter(p => p.category === activeCategory);

    const displayedProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;
    const isLimited = limit && filteredProducts.length > limit;

    const groupedProducts = filteredProducts.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {} as Record<string, typeof products>);

    const categoryOrder = ["Fruit Bomb", "Premium", "Classic", "Special", "Popsicles"];
    const sortedCategories = Object.keys(groupedProducts).sort((a, b) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        if (indexA === -1 && indexB === -1) return a.localeCompare(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });

    const visibleCategories = categoryCount ? sortedCategories.slice(0, categoryCount) : sortedCategories;
    const isCategoryLimited = categoryCount ? sortedCategories.length > categoryCount : false;

    const toggleCategory = (category: string) => {
        setOpenCategories(prev =>
            prev.includes(category)
                ? []
                : [category]
        );
    };

    const handleViewDetails = (product: typeof products[0]) => {
        setSelectedProduct(product);
    };

    return (
        <section id="products" className="py-24 bg-[#FFF8F0]">
            <div className="container mx-auto px-4">
                <ScrollReveal width="100%" className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-brand-dark">Our Menu</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our wide range of handcrafted delights. Click on any window to open it.
                        {isLimited && (
                            <span className="block mt-2 text-sm font-medium text-brand-green">
                                Showing {displayedProducts.length} of {filteredProducts.length} products
                            </span>
                        )}
                    </p>
                </ScrollReveal>

                {activeCategory !== "All" && (
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
                )}

                {activeCategory === "All" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {visibleCategories.map((category, categoryIndex) => {
                            const isOpen = openCategories.includes(category);
                            return (
                                <ScrollReveal key={category} delay={categoryIndex * 0.1} width="100%">
                                    <div className="relative" style={{ perspective: "1000px" }}>
                                        <motion.div
                                            className="relative bg-[#D2E5C5] border-[5px] border-[#4A8391] rounded-3xl shadow-2xl transition-all duration-500 h-[500px]"
                                            layout
                                        >
                                            {/* Inner Content Wrapper for Clipping */}
                                            <div className="relative h-full overflow-hidden rounded-3xl z-10 bg-[#D2E5C5] flex flex-col">

                                                {/* Top Arched Header Area - Always present */}
                                                <div
                                                    className="relative h-32 bg-[#4A8391] overflow-hidden shrink-0 rounded-t-[25px] cursor-pointer"
                                                    onClick={() => toggleCategory(category)}
                                                >
                                                    {/* Decorative Arch Background */}
                                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[200%] bg-white/10 rounded-[50%]"></div>

                                                    {/* Header Content - Visible when Open */}
                                                    <motion.div
                                                        className="relative z-10 flex items-center justify-between px-8 h-full"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: isOpen ? 1 : 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <div>
                                                            <h3 className="text-3xl font-bold font-heading text-[#D2E5C5]">
                                                                {category}
                                                            </h3>
                                                            <p className="text-[#D2E5C5]/80 text-sm">
                                                                {groupedProducts[category].length} Items Inside
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                </div>

                                                {/* Content Area (Product List) - Scrollable */}
                                                <motion.div
                                                    className="p-6 bg-[#D2E5C5] flex-1 overflow-y-auto custom-scrollbar"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: isOpen ? 1 : 0 }}
                                                    transition={{ duration: 0.5, delay: 0.2 }}
                                                >
                                                    <div className="flex flex-col gap-2">
                                                        {groupedProducts[category].map((product, index) => (
                                                            <motion.div
                                                                key={product.id}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                                                                transition={{ delay: 0.2 + (index * 0.05) }}
                                                                whileHover={{ x: 5, scale: 1.02 }}
                                                                className="bg-white/80 backdrop-blur rounded-lg p-3 flex items-center justify-between cursor-pointer border border-[#4A8391]/10 hover:border-[#4A8391] hover:shadow-md transition-all"
                                                                onClick={() => handleViewDetails(product)}
                                                            >
                                                                <span className="font-bold text-[#4A8391] font-heading">{product.name}</span>
                                                                <button
                                                                    className="text-xs font-bold text-[#4A8391] hover:underline"
                                                                >
                                                                    View →
                                                                </button>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            </div>

                                            {/* Shutters Overlay - Absolute Positioned */}
                                            <div
                                                className="absolute inset-0 z-20 pointer-events-none"
                                                style={{ perspective: "1000px" }}
                                            >
                                                {/* Left Shutter */}
                                                <motion.div
                                                    className="absolute top-0 left-0 w-1/2 h-full bg-[#D2E5C5] border-r-[3px] border-[#4A8391] origin-left z-20 cursor-pointer pointer-events-auto shadow-lg"
                                                    style={{ borderRadius: "100% 0 0 0" }} // Arched top left
                                                    animate={{ rotateY: isOpen ? -140 : 0 }}
                                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                                    onClick={(e) => { e.stopPropagation(); toggleCategory(category); }}
                                                    whileHover={{ brightness: isOpen ? 1 : 0.95 }}
                                                >
                                                    <div className="w-full h-full bg-gradient-to-b from-transparent to-black/5" />
                                                </motion.div>

                                                {/* Right Shutter */}
                                                <motion.div
                                                    className="absolute top-0 right-0 w-1/2 h-full bg-[#D2E5C5] border-l-[3px] border-[#4A8391] origin-right z-20 cursor-pointer pointer-events-auto shadow-lg"
                                                    style={{ borderRadius: "0 100% 0 0" }} // Arched top right
                                                    animate={{ rotateY: isOpen ? 140 : 0 }}
                                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                                    onClick={(e) => { e.stopPropagation(); toggleCategory(category); }}
                                                    whileHover={{ brightness: isOpen ? 1 : 0.95 }}
                                                >
                                                    <div className="w-full h-full bg-gradient-to-b from-transparent to-black/5" />
                                                </motion.div>

                                                {/* Central Label (Visible when Closed) */}
                                                <motion.div
                                                    className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-auto cursor-pointer"
                                                    onClick={() => toggleCategory(category)}
                                                    animate={{ opacity: isOpen ? 0 : 1, pointerEvents: isOpen ? "none" : "auto" }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="bg-[#4A8391] text-[#D2E5C5] px-6 py-2 rounded-full font-bold font-heading text-xl shadow-lg border-2 border-[#D2E5C5]">
                                                        {category}
                                                    </div>
                                                    <div className="mt-4 text-[#4A8391] font-bold uppercase tracking-wider text-sm bg-[#D2E5C5]/80 px-4 py-1 rounded-full backdrop-blur-sm">
                                                        Click to Open
                                                    </div>
                                                </motion.div>
                                            </div>

                                            {/* Bottom Bar (Visible when Closed) - Part of the wrapper but below shutters */}
                                            <motion.div
                                                className="absolute bottom-0 left-0 w-full h-[50px] bg-[#D2E5C5] border-t-[5px] border-[#4A8391] flex items-center justify-center z-10"
                                                animate={{ opacity: isOpen ? 0 : 1 }}
                                            >
                                                <span className="text-[#4A8391] font-bold uppercase tracking-wider text-sm">
                                                    {groupedProducts[category].length} Items Inside
                                                </span>
                                            </motion.div>

                                        </motion.div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                ) : (
                    // Keep your existing grid view for category filters
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {displayedProducts.map(product => (
                                <motion.div
                                    layout
                                    key={product.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    whileHover={{
                                        y: -10,
                                        rotateX: 5,
                                        rotateY: 5,
                                        transition: { duration: 0.2 }
                                    }}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-brand-dark font-bold shadow-lg">
                                            {product.price}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-4">
                                            <span className="text-brand-green text-sm font-bold tracking-wider uppercase bg-brand-green/10 px-3 py-1 rounded-full">
                                                {product.category}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold font-heading mb-2 text-brand-dark">{product.name}</h3>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                            {product.description}
                                        </p>
                                        {/* <button className="w-full bg-brand-dark text-white py-3 rounded-lg font-medium hover:bg-brand-green transition-colors duration-300 transform group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100">
                                            Order Now
                                        </button> */}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {showViewAll && (isLimited || isCategoryLimited) && (
                    <ScrollReveal delay={0.3} className="text-center mt-12">
                        <Link to="/products">
                            <motion.button
                                className="inline-flex items-center gap-2 bg-brand-green text-white px-8 py-4 rounded-lg hover:bg-brand-dark transition-all shadow-lg hover:shadow-xl font-medium text-lg"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View All Products
                                <ChevronRight className="w-5 h-5" />
                            </motion.button>
                        </Link>
                    </ScrollReveal>
                )}

                {/* Product Details Modal */}
                <AnimatePresence>
                    {selectedProduct && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedProduct(null)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            />
                            <motion.div
                                layoutId={`product-${selectedProduct.id}`}
                                className="relative w-full max-w-2xl bg-[#FFF8F0] rounded-3xl shadow-2xl overflow-hidden z-50"
                                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                            >
                                <button
                                    onClick={() => setSelectedProduct(null)}
                                    className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-brand-dark" />
                                </button>

                                <div className="grid md:grid-cols-2 h-full">
                                    <div className="h-64 md:h-full relative bg-gray-100">
                                        <img
                                            src={selectedProduct.image}
                                            alt={selectedProduct.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-8 flex flex-col justify-center">
                                        <span className="text-brand-green font-bold text-sm tracking-wider uppercase mb-2">
                                            {selectedProduct.category}
                                        </span>
                                        <h3 className="text-3xl font-bold font-heading text-brand-dark mb-4">
                                            {selectedProduct.name}
                                        </h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            {selectedProduct.description}
                                        </p>
                                        <div className="flex items-center justify-between mb-8">
                                            <span className="text-3xl font-bold text-[#4A8391]">
                                                {selectedProduct.price}
                                            </span>
                                        </div>
                                        {/* <button
                                            className="w-full bg-[#4A8391] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#386a76] transition-colors shadow-lg hover:shadow-[#4A8391]/30"
                                            onClick={() => alert("Order functionality coming soon!")}
                                        >
                                            Order Now
                                        </button> */}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};