/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'off-white': '#F9F9F9',
                'orange-vibrant': '#FF8C00',
                'dark-graphite': '#1A1A1A',
            },
            fontFamily: {
                sans: ['"Inter"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
