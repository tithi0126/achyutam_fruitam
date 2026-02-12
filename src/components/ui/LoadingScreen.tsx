import React from 'react';
import logo from '../../assets/logo.jpg';

export const LoadingScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[9999] bg-brand-dark flex items-center justify-center transition-opacity duration-500">
            <div className="relative w-32 h-32 md:w-40 md:h-40 animate-pulse">
                <img
                    src={logo}
                    alt="Achyutam Fruitam"
                    className="w-full h-full object-contain rounded-full shadow-xl"
                />
            </div>
        </div>
    );
};
