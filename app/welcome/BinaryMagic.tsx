import { useState, useEffect, useMemo } from "react";
import BASE_URL from "../config";
import { MagicCard } from "./MagicCard";
import { RevealNumber } from "./RevealNumber";
import { useMagicSounds } from "~/hooks/useMagicSounds";
import { Sparkles, RotateCcw } from "lucide-react";

export default function () {
    const [cards, setCards] = useState<number[][]>([]);
    const totalCards = 7;

    useEffect(() => {
        fetch(`${BASE_URL}generate-cards/?cards=${totalCards}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setCards(data.cards);
            })
            .catch((error) => {
                console.error(
                    "There was a problem with the fetch operation:",
                    error
                );
            });
    }, [totalCards]);

    const [selectedCards, setSelectedCards] = useState<boolean[]>([]);

    useEffect(() => {
        setSelectedCards(Array(totalCards).fill(false));
    }, [totalCards]);

    const [isRevealed, setIsRevealed] = useState(false);
    const [revealedNumber, setRevealedNumber] = useState(0);
    const { playSelectSound, playDeselectSound, playRevealSound } =
        useMagicSounds();

    const toggleCard = (index: number) => {
        const newSelected = [...selectedCards];
        const wasSelected = newSelected[index];
        newSelected[index] = !newSelected[index];
        setSelectedCards(newSelected);

        if (wasSelected) {
            playDeselectSound();
        } else {
            playSelectSound();
        }
    };

    const calculateNumber = (): number => {
        let sum = 0;
        selectedCards.forEach((isSelected, index) => {
            if (isSelected) {
                sum += Math.pow(2, index);
            }
        });
        return sum;
    };

    const handleReveal = () => {
        const number = calculateNumber();
        setRevealedNumber(number);
        setIsRevealed(true);
        playRevealSound();
    };

    const handleReset = () => {
        setSelectedCards(Array(totalCards).fill(false));
        setIsRevealed(false);
        setRevealedNumber(0);
    };

    const hasSelection = selectedCards.some(Boolean);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center w-screen bg-magic py-8 px-4">
            <div className="max-w-12xl mx-auto">
                {/* Header */}
                <header className="text-center mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary mb-4 animate-float">
                        Binary Card Magic
                    </h1>
                    <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
                        Think of a number between 1 and {cards[0]?.at(-1)}.
                        Select all cards that contain your number, then let me
                        read your mind.
                    </p>
                </header>

                {/* Instructions */}
                <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-sm text-muted-foreground">
                            {hasSelection
                                ? `${selectedCards.filter(Boolean).length} card${selectedCards.filter(Boolean).length > 1 ? "s" : ""} selected`
                                : "Tap cards containing your number"}
                        </span>
                    </div>
                </div>

                {/* Cards Grid */}
                {cards.length > 0 && (
                    <div
                        className="flex flex-wrap justify-center gap-4"
                        style={{
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(220px, max-content))",
                        }}
                    >
                        {cards.map((numbers, index) => (
                            <MagicCard
                                key={index}
                                numbers={numbers}
                                cardIndex={index}
                                isSelected={selectedCards[index]}
                                onClick={() => toggleCard(index)}
                                disabled={isRevealed}
                            />
                        ))}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                    <button
                        onClick={handleReveal}
                        disabled={!hasSelection || isRevealed}
                        className="inline-flex items-center justify-center gap-2 font-display text-lg px-8 py-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none transition-all gold-glow"
                    >
                        <Sparkles className="w-5 h-5" />
                        Reveal My Number
                    </button>

                    <button
                        onClick={handleReset}
                        className="inline-flex items-center justify-center gap-2 font-display text-lg px-8 py-4 rounded-lg border border-border bg-transparent text-foreground hover:border-primary hover:text-primary transition-all"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Start Over
                    </button>
                </div>

                {/* Footer hint */}
                {/* <footer className="text-center mt-12 text-muted-foreground text-sm">
                    <p>
                        The magic works using binary arithmetic — each card
                        represents a power of 2!
                    </p>
                </footer> */}
            </div>

            {/* Reveal Overlay */}
            {isRevealed && (
                <div onClick={handleReset}>
                    <RevealNumber
                        number={revealedNumber}
                        isRevealed={isRevealed}
                    />
                </div>
            )}
        </div>
    );
}
