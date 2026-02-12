
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { ScrollToTop } from './components/utils/ScrollToTop';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Products } from './pages/Products';
import { StoreLocator } from './pages/StoreLocator';
import { Contact } from './pages/Contact';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading delay to ensure the branding is seen
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading && <LoadingScreen />}
            <div className={`transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                <Router>
                    <ScrollToTop />
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/outlets" element={<StoreLocator />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                    <Footer />
                </Router>
            </div>
        </>
    );
}

export default App;
