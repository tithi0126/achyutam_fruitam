
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-brand-dark text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

                    {/* Brand Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-heading font-bold text-fruit-mango">Achyutam Fruitam</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Serving freshness since 2018. Handcrafted natural fruit ice creams made with love and 100% real fruit.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-fruit-mango transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-fruit-mango transition-colors"><Facebook className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 font-heading">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link to="/" className="hover:text-fruit-mango transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-fruit-mango transition-colors">Our Story</Link></li>
                            <li><Link to="/products" className="hover:text-fruit-mango transition-colors">Flavors</Link></li>
                            <li><Link to="/outlets" className="hover:text-fruit-mango transition-colors">Find a Store</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 font-heading">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 mt-1 text-fruit-mango" />
                                <span>Head Office: Surat, Gujarat, India</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-fruit-mango" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-fruit-mango" />
                                <span>hello@achyutamfruitam.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter / CTA */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 font-heading">Franchise</h4>
                        <p className="text-gray-300 text-sm mb-4">
                            Interested in partnering with us? Join the Achyutam family today!
                        </p>
                        <button className="bg-fruit-mango text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors text-sm font-medium w-full">
                            Enquire Now
                        </button>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-400">
                    <p>© {new Date().getFullYear()} Achyutam Fruitam. All rights reserved. Made with ❤️ in Gujarat.</p>
                </div>
            </div>
        </footer>
    );
};
