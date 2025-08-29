// src/components/LoadingPage.jsx
import React, { useEffect, useState } from "react";

export default function LoadingPage({ cityName }) {
    const funMessages = [
        "Wait small eje... ⏳",
        "Chop rice first... 🍚",
        "Try get small patience... 🙏",
        "No vex, e dey load... 😅",
        "Hold body, e go soon show... 💨",
        "Network just dey do anyhow... 📡",
        "Relax, make breeze blow small... 🌬️",
        "Shebi you wan waka? E dey come... 🚶🏾‍♀️",
        "Abeg calm down, data dey arrange... 📲",
    ];

    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % funMessages.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-black">
            <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin mt-6"></div>

            <p className="mt-6 text-lg font-medium animate-pulse">
                {funMessages[messageIndex]}
            </p>
        </div>
    );
}
