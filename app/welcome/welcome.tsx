import { useEffect, useState } from "react";
import BASE_URL from "../config";

export default function CardGenerator() {
    const [cards, setCards] = useState<number[][]>([]);
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState(true);
    const noOfCards = 6

    useEffect(() => {
        fetch(`${BASE_URL}generate-cards/?cards=${noOfCards}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCards(data.cards);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-screen px-4 magic-gradient">
            <h1 className="text-5xl font-bold text-primary mb-8">Card Magic</h1>
            <p className="text-gray-300">Think of a number between 1 and {cards[0]?.at(-1)}. Select all cards that contain your number, then let me read your mind.</p>
            <div className="flex flex-wrap justify-center mt-8 w-full">
                {error && (
                    <div className="text-red-500 font-bold">{`Error: ${error}`}</div>
                )}
                {loading ? (
                    <div className="text-primary">Loading cards...</div>  // Display loading state
                ) : (
                    <div className="flex flex-wrap justify-center w-full gap-10">
                        {cards.length > 0 ? (
                            cards.map((card, index) => (
                                <div key={index} className="p-4 border-2 border-muted rounded-lg bg-card shadow-md">
                                    <h2 className="text-center text-2xl text-muted font-semibold mb-4">{index + 1}</h2>
                                    <div className={`grid grid-cols-${noOfCards} gap-2`}>
                                        {card.map((number, idx) => (
                                            <div 
                                                key={idx} 
                                                className="flex items-center justify-center h-12 w-12 text-gray-200 rounded-full text-lg font-semibold shadow-md">
                                                {number}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No cards available.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
