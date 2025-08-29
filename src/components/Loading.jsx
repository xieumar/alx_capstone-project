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
        <div className="flex flex-col items-center justify-center h-[80vh] text-black">

            <div className="flex space-x-2">
                <div className="w-3 h-3 bg-blue-700/50 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-800/70 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
                <div className="w-3 h-3 bg-blue-900 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
            </div>

            <p className="text-lg font-medium animate-pulse">
                {funMessages[messageIndex]}
            </p>
        </div>
    );
}
