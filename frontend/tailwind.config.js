/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                white: '#ffffff',
                brown: '#7e685a',
                green: '#afd275',
                darkbrown: '#594622',
                bronze: '#A68C5D',
                deer: '#BF7960',
                deeptaupe: '#735F5D',
            },
            backgroundImage: {
                nature: "url('home/assets/Wallpaper.png')",
            },
            fontSize: {
                xxs: ['10px', '14px'],
            },
            fontFamily: {
                'noto': ["'Noto Sans Buhid'", 'sans-serif']
            },
            spacing: {
				"10vh": "10vh",
                "15vh": "15vh",
				"20vh": "20vh",
                "25vh": "25vh",
				"30vh": "30vh",
				"40vh": "40vh",
				"50vh": "50vh",
				"60vh": "60vh",
				"70vh": "70vh",
				"80vh": "80vh",
				"90vh": "90vh",
                "93vh": "93vh",
				"100vh": "100vh",
                "10vw": "10vw",
                "15vw": "15vw",
				"20vw": "20vw",
                "25vw": "25vw",
				"30vw": "30vw",
				"40vw": "40vw",
				"50vw": "50vw",
				"60vw": "60vw",
				"70vw": "70vw",
				"80vw": "80vw",
				"90vw": "90vw",
				"100vw": "100vw",
			},
        },
        screens: {
            tablet: '640px',
            laptop: '1024px',
            desktop: '1280px',
        },
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
    variants: {
        scrollbar: ['rounded']
    }
};
