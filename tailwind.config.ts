import { transform } from 'next/dist/build/swc'
import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        fontFamily: {
            brand: ['Panchang-Medium'],
            title: ['Technor-Light'],
            body: ['Supreme-Regular'],
        },
        extend: {
            keyframes: {
                enter: {
                    '0%': { transform: 'translateX(-100%)' },
                    '90%': { transform: 'translateX(3%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
                popin: {
                    '0%': { transform: 'scale(0)' },
                    '90%': {
                        transform: 'scale(110%)',
                    },
                    '100%': { transform: 'scale(100%)' },
                },
            },
            animation: {
                enterIn: 'enter 0.3s ease-out',
                popUp: 'popin 0.2 ease-in-out',
            },
        },
    },
    plugins: [],
}
export default config
