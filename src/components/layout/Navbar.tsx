import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram } from 'lucide-react';
import { cn } from '../../lib/utils';
import logo from '../../assets/logo.png';
import { MagneticButton } from '../ui/MagneticButton';

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

    const handleFranchiseClick = () => {
        setIsOpen(false);
        // Navigate to contact page or scroll to contact section
        if (location.pathname === '/') {
            // If on home page, scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Navigate to contact page
            window.location.href = '/contact';
        }
    };

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

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
                <Link to="/" className="flex items-center gap-3 group">
                    <motion.img
                        src={logo}
                        alt="Icecream Shop"
                        className="h-12 w-auto rounded-full transition-transform group-hover:scale-110"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                    />
                    <motion.span
                        className={cn(
                            "text-xl font-bold font-heading transition-colors",
                            isTransparent ? "text-white" : "text-brand-dark"
                        )}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        Icecream Shop
                    </motion.span>
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
                    <a href="https://instagram.com/icecream_shop" target="_blank" rel="noopener noreferrer">
                        <button className={cn(
                            "p-2 rounded-full transition-colors",
                            isTransparent ? "text-white hover:bg-white/10" : "text-brand-green hover:bg-brand-light"
                        )}>
                            <Instagram className="w-5 h-5" />
                        </button>
                    </a>
                    <MagneticButton
                        onClick={handleFranchiseClick}
                        className={cn(
                            "bg-fruit-mango text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600 transition-colors cursor-pointer"
                        )}
                    >
                        Franchise Inquiry
                    </MagneticButton>
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

            {/* Mobile Menu Overlay - Full Screen */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-white z-40 md:hidden overflow-y-auto"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 p-2 text-gray-800 hover:text-brand-green transition-colors"
                            aria-label="Close menu"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="min-h-screen flex flex-col items-center justify-center p-8">
                            {/* Navigation Links */}
                            <nav className="flex flex-col items-center gap-6 mb-12">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            to={link.path}
                                            className={cn(
                                                "text-2xl font-semibold transition-colors",
                                                location.pathname === link.path ? "text-brand-green" : "text-gray-800 hover:text-brand-green"
                                            )}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Action Buttons */}
                            <motion.div
                                className="flex flex-col items-center gap-4 w-full max-w-xs"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navLinks.length * 0.1 }}
                            >
                                <a href="https://instagram.com/icecream_shop" target="_blank" rel="noopener noreferrer" className="w-full">
                                    <button className="w-full flex items-center justify-center gap-2 border-2 border-brand-green text-brand-green py-3 rounded-lg hover:bg-brand-green hover:text-white font-medium transition-all">
                                        <Instagram className="w-5 h-5" /> Follow on Instagram
                                    </button>
                                </a>
                                <button
                                    onClick={handleFranchiseClick}
                                    className="w-full bg-fruit-mango text-white py-3 rounded-lg hover:bg-orange-600 font-medium transition-colors shadow-lg"
                                >
                                    Franchise Inquiry
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
