export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B2C',
        accent: '#16A29A',
        gold: '#FFC947'
      },
      keyframes: {
        toastSlideIn: {
          "0%": { opacity: 0, transform: "translateY(-20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        toastSlideOut: {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-20px)" }
        }
      },
      animation: {
        toastSlideIn: "toastSlideIn 0.4s ease-out forwards",
        toastSlideOut: "toastSlideOut 0.4s ease-in forwards"
      }
    }
  },
  plugins: []
};
