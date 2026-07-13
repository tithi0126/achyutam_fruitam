
import { Leaf, Award, Heart } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

const features = [
    {
        icon: <Leaf className="w-8 h-8 text-brand-green" />,
        title: "100% Natural",
        description: "Made with real fruit pulp and fresh milk. No artificial essences or colors added."
    },
    {
        icon: <Heart className="w-8 h-8 text-fruit-pomegranate" />,
        title: "Handcrafted with Love",
        description: "Small batches churned to perfection to ensure the creamiest texture and authentic taste."
    },
    {
        icon: <Award className="w-8 h-8 text-fruit-mango" />,
        title: "Premium Quality",
        description: "Sourced from the best farms to bring you flavors that taste exactly like the fruit itself."
    }
];

export const About = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <ScrollReveal width="100%" mode="fade-up" className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-fruit-mango font-medium tracking-wider uppercase text-sm">Our Promise</span>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mt-2 mb-6">Why Choose Icecream Shop?</h2>
                    <p className="text-gray-600 leading-relaxed font-light text-lg">
                        We believe nature provides the best flavors. That's why we don't just make ice cream; we craft frozen delights that celebrate the true essence of fruits. From our signature Fruit Bombs to our classic scoops, every bite is a journey to an orchard.
                    </p>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <ScrollReveal
                            key={index}
                            width="100%"
                            mode="fade-up"
                            delay={index * 0.2}
                            className="h-full"
                        >
                            <div className="bg-brand-light/30 p-8 rounded-2xl hover:shadow-lg transition-shadow border border-transparent hover:border-brand-green/10 h-full">
                                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-6 mx-auto transform hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold font-heading mb-3 text-center">{feature.title}</h3>
                                <p className="text-gray-600 text-center font-light leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};
