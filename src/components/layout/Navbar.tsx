import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram } from 'lucide-react';
// import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import logo from '../../assets/logo.jpg';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Flavors', path: '/products' },
    { name: 'Outlets', path: '/outlets' },
    { name: 'Contact', path: '/contact' },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const isHome = location.pathname === '/';
    const isTransparent = isHome && !scrolled;

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="Achyutam Fruitam" className="h-12 w-auto rounded-full" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={cn(
                                "text-sm font-medium transition-colors",
                                isTransparent
                                    ? "text-white/90 hover:text-white"
                                    : "text-gray-600 hover:text-brand-green",
                                location.pathname === link.path && (isTransparent ? "text-white font-bold" : "text-brand-green font-semibold")
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a href="https://instagram.com/achyutam_fruitam" target="_blank" rel="noopener noreferrer">
                        <button className={cn(
                            "p-2 rounded-full transition-colors",
                            isTransparent ? "text-white hover:bg-white/10" : "text-brand-green hover:bg-brand-light"
                        )}>
                            <Instagram className="w-5 h-5" />
                        </button>
                    </a>
                    <button className="bg-fruit-mango text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600 transition-colors">Franchise Inquiry</button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={cn(
                        "md:hidden p-2",
                        isTransparent ? "text-white" : "text-brand-dark"
                    )}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden flex flex-col p-4 border-t"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={cn(
                                    "py-3 px-4 text-lg font-medium border-b border-gray-100 last:border-none",
                                    location.pathname === link.path ? "text-brand-green" : "text-gray-800"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="mt-4 flex flex-col gap-3">
                            <a href="https://instagram.com/achyutam_fruitam" target="_blank" rel="noopener noreferrer" className="w-full">
                                <button className="w-full flex items-center justify-center gap-2 border border-brand-green text-brand-green py-2 rounded hover:bg-gray-50 text-sm font-medium transition-colors">
                                    <Instagram className="w-4 h-4" /> Follow on Instagram
                                </button>
                            </a>
                            <button className="w-full bg-fruit-mango text-white py-2 rounded hover:bg-orange-600 text-sm font-medium transition-colors">Franchise Inquiry</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
