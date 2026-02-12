import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Products } from '../components/sections/Products';
import { StoreLocator } from '../components/sections/StoreLocator';
import { Contact } from '../components/sections/Contact';
import { InstagramFeed } from '../components/sections/InstagramFeed';

export const Home = () => {
    return (
        <main className="w-full">
            <Hero />
            <About />
            <Products />
            <StoreLocator />
            <Contact />
            <InstagramFeed />
        </main>
    );
};
