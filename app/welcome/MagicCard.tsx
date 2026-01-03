import { cn } from "~/lib/utils";

interface MagicCardProps {
    numbers: number[];
    cardIndex: number;
    isSelected: boolean;
    onClick: () => void;
    disabled?: boolean;
}

export const MagicCard = ({
    numbers,
    cardIndex,
    isSelected,
    onClick,
    disabled,
}: MagicCardProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "relative w-90",  // Remove aspect ratio, just let height grow
                "border-2 bg-card card-shadow",
                "rounded-xl transition-all duration-300 ease-out",
                "hover:scale-105 hover:-translate-y-2",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0",
                isSelected
                    ? "border-primary gold-glow"
                    : "border-border hover:border-primary/50"
            )}
        >
            {/* Card index */}
            <div className="absolute top-2 left-2 text-primary/70 font-display font-bold">
                {cardIndex + 1}
            </div>

            {/* Selected indicator */}
            {isSelected && (
                <div className="absolute top-2 right-2 z-10">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <svg
                            className="w-4 h-4 text-primary-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>
            )}

            {/* Content area (no absolute positioning) */}
            <div className="pt-10 pb-4 px-4">
                <div className="w-full">
                    <div
                        className="grid gap-2"
                        style={{
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(2.5rem, 1fr))",
                        }}
                    >
                        {numbers.map((num) => (
                            <div
                                key={num}
                                className={cn(
                                    "flex items-center justify-center h-9 rounded-md text-sm font-display font-semibold",
                                    isSelected
                                        ? "text-primary"
                                        : "text-foreground/80"
                                )}
                            >
                                {num}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subtle magical sparkles */}
            {isSelected && (
                <>
                    <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-primary rounded-full animate-sparkle" />
                    <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-primary rounded-full animate-sparkle" />
                </>
            )}
        </button>
    );
};
