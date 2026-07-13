import { Instagram, Heart, MessageCircle } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';
import mangoImg from '../../assets/mango.png';
import strawberryImg from '../../assets/strawberry.png';
import chocolateImg from '../../assets/chocolate.png';

const MOCK_POSTS = [
    {
        image: mangoImg,
        likes: "1,248",
        comments: "84",
        caption: "Indulge in the rich, creaminess of our signature Alphonso Mango scoop! Made from 100% real fruit pulp. 🥭✨ #mango #icecream #natural",
        date: "2 days ago"
    },
    {
        image: strawberryImg,
        likes: "942",
        comments: "56",
        caption: "Freshly harvested strawberries meets rich dairy cream. Try our Sweet Strawberry flavor today! 🍓🍦 #fresh #dessert #premium",
        date: "4 days ago"
    },
    {
        image: chocolateImg,
        likes: "2,105",
        comments: "142",
        caption: "For the chocolate-lovers: Decadent dark chocolate churned to pure, smooth perfection. 🍫❤️ #chocolate #indigo #creamy",
        date: "1 week ago"
    }
];

export const InstagramFeed = () => {
    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 mb-12 text-center">
                <ScrollReveal width="100%" className="flex flex-col items-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Instagram className="w-6 h-6 text-brand-green" />
                        <span className="text-brand-green font-medium tracking-wider uppercase text-sm">Follow Us</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading text-brand-dark mb-4">@icecream.shop</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Join our community of ice cream lovers. Tag us in your stories to be featured!
                    </p>
                </ScrollReveal>
            </div>

            {/* Scrolling Feed Container */}
            <ScrollReveal width="100%" delay={0.2} mode="fade-in">
                <div className="relative w-full">
                    <div className="flex overflow-x-auto pb-8 gap-6 px-4 snap-x snap-mandatory scrollbar-hide justify-center">
                        {MOCK_POSTS.map((post, index) => (
                            <motion.div 
                                key={index} 
                                className="flex-shrink-0 w-[350px] bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden snap-center flex flex-col justify-between"
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Header */}
                                <div className="p-4 flex items-center gap-3 border-b border-gray-50">
                                    <img src={logo} alt="Icecream Shop" className="w-9 h-9 rounded-full object-cover" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">icecream.shop</p>
                                        <p className="text-xs text-gray-500">Gourmet Parlour</p>
                                    </div>
                                </div>

                                {/* Image Body */}
                                <div className="h-[250px] bg-gradient-to-br from-brand-light to-white relative overflow-hidden flex items-center justify-center p-6">
                                    <img 
                                        src={post.image} 
                                        alt="Instagram post" 
                                        className="max-h-full max-w-full object-contain filter drop-shadow-lg transform group-hover:scale-105 transition-transform" 
                                    />
                                </div>

                                {/* Actions */}
                                <div className="p-4 space-y-3">
                                    <div className="flex gap-4 text-gray-700">
                                        <button className="hover:text-red-500 transition-colors flex items-center gap-1">
                                            <Heart className="w-5 h-5" />
                                            <span className="text-xs font-semibold">{post.likes}</span>
                                        </button>
                                        <button className="hover:text-brand-green transition-colors flex items-center gap-1">
                                            <MessageCircle className="w-5 h-5" />
                                            <span className="text-xs font-semibold">{post.comments}</span>
                                        </button>
                                    </div>

                                    {/* Caption */}
                                    <div>
                                        <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
                                            <span className="font-semibold text-gray-800 mr-2">icecream.shop</span>
                                            {post.caption}
                                        </p>
                                    </div>

                                    {/* Date */}
                                    <p className="text-[10px] text-gray-400 uppercase font-medium">{post.date}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            <div className="text-center mt-8">
                <ScrollReveal width="100%" delay={0.4} className="inline-block">
                    <a
                        href="https://instagram.com/icecream_shop"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-brand-green text-white rounded-full font-semibold hover:bg-brand-dark transition-all transform hover:-translate-y-1 shadow-lg"
                    >
                        View Instagram <Instagram className="w-4 h-4" />
                    </a>
                </ScrollReveal>
            </div>
        </section>
    );
};
