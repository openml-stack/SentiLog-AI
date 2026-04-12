import { useState, useEffect } from "react";

const BackToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) setVisible(true);
            else setVisible(false);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-12 right-8 px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-700 dark:from-sky-700 dark:to-blue-800 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300 z-50"
        >
            Back To Top ↑
        </button>
    );
};

export default BackToTopButton;
