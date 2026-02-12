
import { MapPin, Navigation } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
// import { Button } from '../ui/button';

// Mock Store Data
const stores = [
    { id: 1, city: "Surat", location: "Vesu Main Road", address: "Shop 4, Aastha Square, VIP Road, Vesu", phone: "+91 98765 12345" },
    { id: 2, city: "Surat", location: "Adajan", address: "G-12, Titanium Business Hub, Adajan Gam", phone: "+91 98765 67890" },
    { id: 3, city: "Ahmedabad", location: "Sindhu Bhavan", address: "Shop 10, The Retail Park, SBR, Ahmedabad", phone: "+91 98765 54321" },
    { id: 4, city: "Vadodara", location: "Alkapuri", address: "Shop 5, Emerald Complex, Alkapuri Main Road", phone: "+91 98765 98765" },
];

export const StoreLocator = () => {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-light rounded-bl-full opacity-50 pointer-events-none" />

            <div className="container mx-auto px-4">
                <ScrollReveal width="100%" className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="max-w-xl">
                        <span className="text-brand-green font-medium tracking-wider uppercase text-sm">Visit Us</span>
                        <h2 className="text-3xl md:text-5xl font-bold font-heading mt-2">Find a Store Near You</h2>
                        <p className="text-gray-600 mt-4 font-light text-lg">We are growing fast! Visit our nearest outlet to experience the freshness live.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-brand-green text-white px-6 py-3 rounded-lg hover:bg-brand-dark transition-colors">
                        <MapPin className="w-5 h-5" /> View on Google Maps
                    </button>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stores.map((store, index) => (
                        <ScrollReveal key={store.id} width="100%" delay={index * 0.1} className="h-full">
                            <div className="border border-gray-100 bg-white p-6 rounded-xl hover:shadow-lg transition-all group h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="px-2 py-1 bg-brand-light text-brand-dark text-xs font-bold rounded mb-2 inline-block uppercase">
                                            {store.city}
                                        </span>
                                        <h3 className="text-xl font-bold font-heading group-hover:text-brand-green transition-colors">{store.location}</h3>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded-full group-hover:bg-brand-green group-hover:text-white transition-colors">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{store.address}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <span className="text-sm font-medium text-gray-700">{store.phone}</span>
                                    <button className="text-sm font-bold text-brand-green flex items-center gap-1 hover:text-brand-dark transition-colors">
                                        Get Directions <Navigation className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};
