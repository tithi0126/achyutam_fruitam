/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    green: '#0D5C5C',
                    dark: '#0A4848',
                    light: '#E6F2F2',
                },
                fruit: {
                    mango: '#FF9F1C',
                    pomegranate: '#E63946',
                    guava: '#F77F00',
                }
            },
            fontFamily: {
                heading: ['Josefin Sans', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
