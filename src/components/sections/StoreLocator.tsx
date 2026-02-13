import { useState } from 'react';
import { MapPin, Navigation, ChevronRight, Phone, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../ui/ScrollReveal';
// import { Button } from '../ui/button';

// Comprehensive Store Data from Instagram
const stores = [
    // Ahmedabad Locations
    { id: 1, city: "Ahmedabad", location: "Nikol", address: "Nikol, Ahmedabad", phone: "+91 98765 12341", coordinates: "23.0549,72.6573" },
    { id: 2, city: "Ahmedabad", location: "Maninagar", address: "Maninagar, Ahmedabad", phone: "+91 98765 12342", coordinates: "22.9965,72.6011" },
    { id: 3, city: "Ahmedabad", location: "Science City", address: "Science City, Ahmedabad", phone: "+91 98765 12343", coordinates: "23.0474,72.5345" },
    { id: 4, city: "Ahmedabad", location: "Gota", address: "Gota, Ahmedabad", phone: "+91 98765 12344", coordinates: "23.1107,72.5369" },
    { id: 5, city: "Ahmedabad", location: "FrizBee Sindhu Bhavan", address: "Sindhu Bhavan, Ahmedabad", phone: "+91 98765 12345", coordinates: "23.0225,72.5714" },
    { id: 6, city: "Ahmedabad", location: "Bopal", address: "Bopal, Ahmedabad", phone: "+91 98765 12346", coordinates: "23.0076,72.4642" },
    { id: 7, city: "Ahmedabad", location: "Naranpura", address: "Naranpura, Ahmedabad", phone: "+91 98765 12347", coordinates: "23.0456,72.5678" },
    { id: 8, city: "Ahmedabad", location: "Satellite", address: "Satellite, Ahmedabad", phone: "+91 98765 12348", coordinates: "23.0225,72.5271" },

    // Surat Locations
    { id: 9, city: "Surat", location: "Mota Varacha", address: "Mota Varacha, Surat", phone: "+91 98765 12349", coordinates: "21.2151,72.8287" },
    { id: 10, city: "Surat", location: "Katargam", address: "Opposite Laxmi Enclav-1, Katargam, Surat", phone: "+91 98765 12350", coordinates: "21.2211,72.8201" },
    { id: 11, city: "Surat", location: "Yogichowk", address: "Yogichowk, Surat", phone: "+91 98765 12351", coordinates: "21.1702,72.8311" },
    { id: 12, city: "Surat", location: "Piplod", address: "Piplod, Surat", phone: "+91 98765 12352", coordinates: "21.1551,72.7852" },

    // Other Gujarat Locations
    { id: 13, city: "Bharuch", location: "Bharuch", address: "Bharuch, Gujarat", phone: "+91 98765 12353", coordinates: "21.7051,72.9801" },
    { id: 14, city: "Kamrej", location: "Kamrej", address: "Kamrej, Gujarat", phone: "+91 98765 12354", coordinates: "21.2901,72.9701" },
    { id: 15, city: "Patan", location: "Patan", address: "Patan, Gujarat", phone: "+91 98765 12355", coordinates: "23.8493,72.1266" },
    { id: 16, city: "Morbi", location: "Madhapar Part", address: "Madhapar Part, Morbi, Gujarat", phone: "+91 98765 12356", coordinates: "22.8207,70.8425" },
    { id: 17, city: "Rajkot", location: "Rajkot", address: "Rajkot, Gujarat", phone: "+91 98765 12357", coordinates: "22.3039,70.8022" },
    { id: 18, city: "Sanand", location: "Sanand", address: "Sanand, Gujarat", phone: "+91 98765 12358", coordinates: "22.9925,72.3819" },
    { id: 19, city: "Gandhinagar", location: "Gandhinagar", address: "Gandhinagar, Gujarat", phone: "+91 98765 12359", coordinates: "23.2156,72.6369" },
    { id: 20, city: "Vapi", location: "Vapi", address: "Vapi, Gujarat", phone: "+91 98765 12360", coordinates: "20.3717,72.9047" },
    { id: 21, city: "Navsari", location: "Navsari", address: "Navsari, Gujarat", phone: "+91 98765 12361", coordinates: "20.9467,72.9290" },
    { id: 22, city: "Bardoli", location: "Bardoli", address: "Bardoli, Gujarat", phone: "+91 98765 12362", coordinates: "21.1220,73.1150" },
    { id: 23, city: "Vadodara", location: "Vadodara", address: "Vadodara, Gujarat", phone: "+91 98765 12363", coordinates: "22.3072,73.1812" },

    // Maharashtra Location
    { id: 24, city: "Maharashtra", location: "Amravati", address: "Amravati, Maharashtra", phone: "+91 98765 12364", coordinates: "20.9374,77.7799" },
];

interface StoreLocatorProps {
    limit?: number;
    showViewAll?: boolean;
}

export const StoreLocator = ({ limit, showViewAll = false }: StoreLocatorProps = {}) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleViewAllStores = () => {
        // Open Google Maps with all store locations
        const query = encodeURIComponent('Achyutam Fruitam ice cream stores Gujarat Maharashtra');
        window.open(`https://www.google.com/maps/search/${query}`, '_blank');
    };

    const handleGetDirections = (coordinates: string) => {
        // Open Google Maps with directions to specific store
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${coordinates}`, '_blank');
    };

    // Filter stores based on search query
    const filteredStores = stores.filter(store =>
        store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply limit if provided (ignoring search if limited, usually on Home page)
    // Prioritize Surat stores when limiting
    const sortedStores = [...stores].sort((a, b) => {
        const priorityCity = 'Surat';
        const isASurat = a.city === priorityCity;
        const isBSurat = b.city === priorityCity;
        if (isASurat && !isBSurat) return -1;
        if (!isASurat && isBSurat) return 1;
        return 0;
    });

    const displayedStores = limit ? sortedStores.slice(0, limit) : filteredStores;
    const isLimited = limit && stores.length > limit;

    // Group stores by city
    const groupedStores = displayedStores.reduce((acc, store) => {
        if (!acc[store.city]) {
            acc[store.city] = [];
        }
        acc[store.city].push(store);
        return acc;
    }, {} as Record<string, typeof stores>);

    // Separate Major Cities (Multiple Outlets) vs Single Outlet Cities
    const majorCities: string[] = [];
    const singleOutletStores: typeof stores = [];

    Object.keys(groupedStores).forEach(city => {
        if (groupedStores[city].length > 1) {
            majorCities.push(city);
        } else {
            singleOutletStores.push(...groupedStores[city]);
        }
    });

    // Sort major cities (Ahmedabad, Surat first)
    // Display Surat first as requested
    const cityOrder = ['Surat', 'Ahmedabad'];
    majorCities.sort((a, b) => {
        const indexA = cityOrder.findIndex(city => a.includes(city));
        const indexB = cityOrder.findIndex(city => b.includes(city));
        if (indexA === -1 && indexB === -1) return a.localeCompare(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });

    // Sort single outlet stores by city name
    singleOutletStores.sort((a, b) => a.city.localeCompare(b.city));

    return (
        <section className="py-24 bg-[#FFF8F0] relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-light/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <ScrollReveal width="100%" className="flex flex-col md:flex-row items-end justify-between mb-8 gap-12 border-b-2 border-brand-green/10 pb-8">
                    <div className="max-w-2xl w-full">
                        <span className="text-brand-green font-bold tracking-wider uppercase text-sm bg-brand-green/10 px-4 py-1 rounded-full inline-block mb-4">Visit Us</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-heading text-brand-dark mb-4">Find a Store Near You</h2>
                        <p className="text-gray-600 font-light text-lg leading-relaxed mb-6">
                            We are growing fast! Visit our nearest outlet to experience the freshness live.
                            <span className="block mt-2 font-medium text-brand-green">
                                {isLimited ? `Showing ${displayedStores.length} of ${stores.length}` : stores.length}+ locations across Gujarat & Maharashtra
                            </span>
                        </p>

                        {/* Search Bar - Only show if not limited (i.e. on full Outlet page) */}
                        {!limit && (
                            <div className="relative max-w-md w-full mt-6 mb-2">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:border-brand-green focus:ring-1 focus:ring-brand-green sm:text-sm shadow-sm transition-all"
                                    placeholder="Search by city, area, or address..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleViewAllStores}
                        className="flex items-center gap-2 bg-brand-green text-white px-8 py-4 rounded-xl hover:bg-brand-dark transition-all shadow-lg hover:shadow-brand-green/30 whitespace-nowrap group shrink-0"
                    >
                        <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" /> View on Google Maps
                    </button>
                </ScrollReveal>

                {/* Major Cities (Multiple Outlets) Display */}
                {majorCities.map((city, cityIndex) => (
                    <div key={city} className="mb-16 last:mb-0">
                        <ScrollReveal delay={cityIndex * 0.1}>
                            <h3 className="text-3xl font-bold font-heading mb-8 text-[#4A8391] flex items-center gap-4">
                                {city}
                                <span className="text-base font-normal text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                                    {groupedStores[city].length} {groupedStores[city].length === 1 ? 'store' : 'stores'}
                                </span>
                            </h3>
                        </ScrollReveal>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groupedStores[city].map((store, index) => (
                                <ScrollReveal
                                    key={store.id}
                                    width="100%"
                                    delay={cityIndex * 0.1 + index * 0.05}
                                    className="h-full"
                                >
                                    <div className="relative group h-full">
                                        <div className="absolute inset-0 bg-brand-green/5 rounded-3xl transform group-hover:scale-105 transition-transform duration-300 -z-10" />
                                        <div className="bg-white border-2 border-transparent group-hover:border-[#4A8391]/20 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-6">
                                                    <div>
                                                        <span className="px-3 py-1 bg-[#FFF8F0] text-[#4A8391] text-xs font-bold rounded-full mb-3 inline-block uppercase tracking-wider">
                                                            {store.city}
                                                        </span>
                                                        <h3 className="text-2xl font-bold font-heading text-brand-dark group-hover:text-[#4A8391] transition-colors">
                                                            {store.location}
                                                        </h3>
                                                    </div>
                                                    <div className="bg-[#FFF8F0] p-3 rounded-full text-[#4A8391] group-hover:bg-[#4A8391] group-hover:text-white transition-all duration-300 shadow-inner">
                                                        <MapPin className="w-6 h-6" />
                                                    </div>
                                                </div>

                                                <div className="space-y-3 mb-6">
                                                    <div className="flex items-start gap-3 text-gray-600">
                                                        <MapPin className="w-5 h-5 shrink-0 mt-1 text-gray-400" />
                                                        <p className="text-sm leading-relaxed font-medium">{store.address}</p>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-gray-600">
                                                        <Phone className="w-5 h-5 shrink-0 text-gray-400" />
                                                        <p className="text-sm font-medium">{store.phone}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-6 border-t border-gray-100">
                                                <button
                                                    onClick={() => handleGetDirections(store.coordinates)}
                                                    className="w-full flex items-center justify-center gap-2 bg-[#4A8391] text-white py-3 rounded-xl font-bold hover:bg-[#386a76] transition-all shadow-md hover:shadow-lg group/btn"
                                                >
                                                    Get Directions
                                                    <Navigation className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Single Outlet Cities - Grouped into "Other Locations" */}
                {singleOutletStores.length > 0 && (
                    <div className="mb-16 last:mb-0 mt-16 pt-8 border-t border-brand-green/10">
                        <ScrollReveal>
                            <h3 className="text-3xl font-bold font-heading mb-8 text-[#4A8391] flex items-center gap-4">
                                Other Locations across Gujarat & Maharashtra
                                <span className="text-base font-normal text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                                    {singleOutletStores.length} locations
                                </span>
                            </h3>
                        </ScrollReveal>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {singleOutletStores.map((store, index) => (
                                <ScrollReveal
                                    key={store.id}
                                    width="100%"
                                    delay={index * 0.05}
                                    className="h-full"
                                >
                                    <div className="relative group h-full">
                                        <div className="absolute inset-0 bg-brand-green/5 rounded-3xl transform group-hover:scale-105 transition-transform duration-300 -z-10" />
                                        <div className="bg-white border-2 border-transparent group-hover:border-[#4A8391]/20 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-6">
                                                    <div>
                                                        {/* City is the main focus here */}
                                                        <span className="bg-[#4A8391] text-white px-3 py-1 text-xs font-bold rounded-full mb-3 inline-block uppercase tracking-wider">
                                                            {store.city}
                                                        </span>
                                                        <h3 className="text-xl font-bold font-heading text-brand-dark group-hover:text-[#4A8391] transition-colors">
                                                            {store.location}
                                                        </h3>
                                                    </div>
                                                    <div className="bg-[#FFF8F0] p-3 rounded-full text-[#4A8391] group-hover:bg-[#4A8391] group-hover:text-white transition-all duration-300 shadow-inner">
                                                        <MapPin className="w-6 h-6" />
                                                    </div>
                                                </div>

                                                <div className="space-y-3 mb-6">
                                                    <div className="flex items-start gap-3 text-gray-600">
                                                        <MapPin className="w-5 h-5 shrink-0 mt-1 text-gray-400" />
                                                        <p className="text-sm leading-relaxed font-medium">{store.address}</p>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-gray-600">
                                                        <Phone className="w-5 h-5 shrink-0 text-gray-400" />
                                                        <p className="text-sm font-medium">{store.phone}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-6 border-t border-gray-100">
                                                <button
                                                    onClick={() => handleGetDirections(store.coordinates)}
                                                    className="w-full flex items-center justify-center gap-2 bg-[#4A8391] text-white py-3 rounded-xl font-bold hover:bg-[#386a76] transition-all shadow-md hover:shadow-lg group/btn"
                                                >
                                                    Get Directions
                                                    <Navigation className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                )}

                {/* Coming Soon Section - Only show on full page and no search active */}
                {!limit && !searchQuery && (
                    <ScrollReveal width="100%" delay={0.5} className="mt-20 flex justify-center">
                        <div className="bg-brand-light/30 border border-brand-green/10 rounded-3xl p-12 max-w-4xl w-full mx-auto backdrop-blur-sm text-center">
                            <h4 className="text-3xl font-bold font-heading text-brand-dark mb-4">
                                Coming Soon to More Locations
                            </h4>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                We're expanding rapidly across Gujarat and Maharashtra.
                                Follow us on <a href="https://instagram.com" className="text-[#4A8391] font-bold hover:underline">Instagram</a> for latest store opening updates!
                            </p>
                        </div>
                    </ScrollReveal>
                )}

                {/* View All Button */}
                {showViewAll && isLimited && (
                    <ScrollReveal delay={0.3} className="text-center mt-12">
                        <Link to="/outlets">
                            <motion.button
                                className="inline-flex items-center gap-2 bg-brand-green text-white px-10 py-5 rounded-2xl hover:bg-brand-dark transition-all shadow-xl hover:shadow-2xl font-bold text-lg"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View All Locations
                                <ChevronRight className="w-6 h-6" />
                            </motion.button>
                        </Link>
                    </ScrollReveal>
                )}
            </div>
        </section>
    );
};