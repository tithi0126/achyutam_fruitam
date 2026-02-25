
import { useEffect } from 'react';
import { Instagram } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

// Using the user's provided links and metadata
const INSTAGRAM_POSTS = [
    {
        link: "https://www.instagram.com/reel/DUnRhp6lQuh/?utm_source=ig_embed&utm_campaign=loading",
        owner: "Achyutam Fruitam Ice-cream (@achyutam_fruitam)"
    },
    {
        link: "https://www.instagram.com/reel/DUkSR4sgAe8/?utm_source=ig_embed&utm_campaign=loading",
        owner: "Surat Scenes (@suratcityscenes)"
    },
    {
        link: "https://www.instagram.com/reel/DPLxcM6jYtD/?utm_source=ig_embed&utm_campaign=loading",
        owner: "Achyutam Fruitam Ice-cream (@achyutam_fruitam)"
    }
];

export const InstagramFeed = () => {
    useEffect(() => {
        // Load Instagram Embed Script
        const script = document.createElement("script");
        script.src = "//www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);

        // Process embeds if script is already loaded
        // @ts-ignore
        if (window.instgrm) {
            // @ts-ignore
            window.instgrm.Embeds.process();
        }

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 mb-12 text-center">
                <ScrollReveal width="100%" className="flex flex-col items-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Instagram className="w-6 h-6 text-brand-green" />
                        <span className="text-brand-green font-medium tracking-wider uppercase text-sm">Follow Us</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading text-brand-dark mb-4">@achyutam.fruitam</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Join our community of fruit lovers. Tag us in your stories to be featured!
                    </p>
                </ScrollReveal>
            </div>

            {/* Scrolling Feed Container */}
            <ScrollReveal width="100%" delay={0.2} mode="fade-in">
                <div className="relative w-full">
                    <div className="flex overflow-x-auto pb-8 gap-4 px-4 snap-x snap-mandatory scrollbar-hide justify-center">
                        {INSTAGRAM_POSTS.map((post, index) => (
                            <div key={index} className="flex-shrink-0 w-[350px] snap-center">
                                <blockquote
                                    className="instagram-media"
                                    data-instgrm-captioned
                                    data-instgrm-permalink={post.link}
                                    data-instgrm-version="14"
                                    style={{
                                        background: '#FFF',
                                        border: '0',
                                        borderRadius: '3px',
                                        boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                                        margin: '1px',
                                        maxWidth: '540px',
                                        minWidth: '326px',
                                        padding: '0',
                                        width: 'calc(100% - 2px)'
                                    }}
                                >
                                    <div style={{ padding: '16px' }}>
                                        <a href={post.link} style={{ background: '#FFFFFF', lineHeight: 0, padding: '0 0', textAlign: 'center', textDecoration: 'none', width: '100%' }} target="_blank" rel="noreferrer">
                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '40px', marginRight: '14px', width: '40px' }}></div>
                                                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                                                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '100px' }}></div>
                                                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '60px' }}></div>
                                                </div>
                                            </div>
                                            <div style={{ padding: '19% 0' }}></div>
                                            <div style={{ display: 'flex', height: '50px', margin: '0 auto 12px', width: '50px', justifyContent: 'center', alignItems: 'center' }}>
                                                <Instagram size={40} color="#000000" strokeWidth={1.5} />
                                            </div>
                                            <div style={{ paddingTop: '8px' }}>
                                                <div style={{ color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 550, lineHeight: '18px' }}>View this post on Instagram</div>
                                            </div>
                                            <div style={{ padding: '12.5% 0' }}></div>
                                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '14px', alignItems: 'center' }}>
                                                <div>
                                                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(0px) translateY(7px)' }}></div>
                                                    <div style={{ backgroundColor: '#F4F4F4', height: '12.5px', transform: 'rotate(-45deg) translateX(3px) translateY(1px)', width: '12.5px', flexGrow: 0, marginRight: '14px', marginLeft: '2px' }}></div>
                                                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(9px) translateY(-18px)' }}></div>
                                                </div>
                                                <div style={{ marginLeft: '8px' }}>
                                                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '20px', width: '20px' }}></div>
                                                    <div style={{ width: 0, height: 0, borderTop: '2px solid transparent', borderLeft: '6px solid #f4f4f4', borderBottom: '2px solid transparent', transform: 'translateX(16px) translateY(-4px) rotate(30deg)' }}></div>
                                                </div>
                                                <div style={{ marginLeft: 'auto' }}>
                                                    <div style={{ width: '0px', borderTop: '8px solid #F4F4F4', borderRight: '8px solid transparent', transform: 'translateY(16px)' }}></div>
                                                    <div style={{ backgroundColor: '#F4F4F4', flexGrow: 0, height: '12px', width: '16px', transform: 'translateY(-4px)' }}></div>
                                                    <div style={{ width: 0, height: 0, borderTop: '8px solid #F4F4F4', borderLeft: '8px solid transparent', transform: 'translateY(-4px) translateX(8px)' }}></div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', marginBottom: '24px' }}>
                                                <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '224px' }}></div>
                                                <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '144px' }}></div>
                                            </div>
                                        </a>
                                        <p style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', lineHeight: '17px', marginBottom: 0, marginTop: '8px', overflow: 'hidden', padding: '8px 0 7px', textAlign: 'center', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            <a href={post.link} style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 'normal', lineHeight: '17px', textDecoration: 'none' }} target="_blank" rel="noreferrer">
                                                A post shared by {post.owner}
                                            </a>
                                        </p>
                                    </div>
                                </blockquote>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            <div className="text-center mt-8">
                <ScrollReveal width="100%" delay={0.4} className="inline-block">
                    <a
                        href="https://instagram.com/achyutam_fruitam"
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
