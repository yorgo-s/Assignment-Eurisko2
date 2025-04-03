/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable 'class' strategy for dark mode
    theme: {
        extend: {
            colors: {
                primary: '#3251D0',
            },
        },
    },
    plugins: [],
};