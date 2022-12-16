/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                yinblue: "#2e7daf",
                liyellow: "#FFE78F",
                houseblue: "#00c0d2",
                pintk: "#8614f8",
            },
            fontFamily: {
                ams: ["Amatic SC", "cursive"],
                Ubuntu: ["Ubuntu", "sans-serif"],
                Prompt: ["Prompt", "sans-serif"],
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: true,
    },
}
