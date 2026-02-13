import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
// import { Button } from '../ui/button';

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., API call)
        console.log('Form submitted:', formData);
        alert('Thank you for contacting us! We will get back to you shortly.');
        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    };

    return (
        <section id="contact" className="py-20 bg-gray-50 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-brand-green rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-fruit-mango rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-brand-green font-medium tracking-wider uppercase text-sm">Get in Touch</span>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mt-2 text-brand-dark">Contact Us</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg font-light">
                        Have a question or want to partner with us? We'd love to hear from you. Fill out the form below or reach out directly.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-brand-green text-white p-8 md:p-12 rounded-2xl shadow-xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-fruit-mango opacity-10 rounded-full -ml-10 -mb-10"></div>

                        <h3 className="text-2xl font-bold font-heading mb-6 relative z-10">Contact Information</h3>
                        <p className="text-brand-light mb-8 relative z-10 font-light">
                            Ready to start your journey with Achyutam Fruitam? Reach out for franchise opportunities or general queries.
                        </p>

                        <div className="space-y-6 relative z-10">
                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-lg">
                                    <Phone className="w-6 h-6 text-fruit-mango" />
                                </div>
                                <div>
                                    <p className="text-sm text-brand-light uppercase tracking-wide font-medium">Phone</p>
                                    <p className="text-lg font-semibold mt-1">+91 98765 43210</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-lg">
                                    <Mail className="w-6 h-6 text-fruit-mango" />
                                </div>
                                <div>
                                    <p className="text-sm text-brand-light uppercase tracking-wide font-medium">Email</p>
                                    <p className="text-lg font-semibold mt-1">hello@achyutamfruitam.com</p>
                                    <p className="text-lg font-semibold">franchise@achyutamfruitam.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-lg">
                                    <MapPin className="w-6 h-6 text-fruit-mango" />
                                </div>
                                <div>
                                    <p className="text-sm text-brand-light uppercase tracking-wide font-medium">Head Office</p>
                                    <p className="text-lg font-semibold mt-1">A-101, Titanium Business Hub,</p>
                                    <p className="text-lg">Vesu Main Road, Surat, Gujarat</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
                            <h4 className="font-heading font-bold mb-4">Follow Us</h4>
                            <div className="flex gap-4">
                                {/* Social Icons */}
                                <a href="https://instagram.com/achyutam_fruitam" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.484 2h.058zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm5.338-3.205a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="https://facebook.com/achyutamfruitam" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                                    <span className="sr-only">Facebook</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100"
                    >
                        <h3 className="text-2xl font-bold font-heading mb-6 text-brand-dark">Send us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all pl-10"
                                            placeholder="John Doe"
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all pl-10"
                                            placeholder="+91 98765..."
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all pl-10"
                                        placeholder="john@example.com"
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type</label>
                                <div className="relative">
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all pl-10 appearance-none bg-white"
                                    >
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Franchise Opportunity">Franchise Opportunity</option>
                                        <option value="Event Catering">Event Catering</option>
                                        <option value="Feedback">Feedback / Suggestion</option>
                                    </select>
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <MessageSquare className="w-4 h-4" />
                                    </div>
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Tell us more about your inquiry..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-brand-green text-white font-bold py-4 rounded-lg hover:bg-brand-dark transition-all transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2"
                            >
                                Send Message <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
