import { cn } from "~/lib/utils";

interface RevealNumberProps {
  number: number;
  isRevealed: boolean;
}

export const RevealNumber = ({ number, isRevealed }: RevealNumberProps) => {
  if (!isRevealed) return null;

  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center animate-reveal">
        <p className="text-muted-foreground text-lg sm:text-xl mb-4 font-display">
          Your number is...
        </p>
        <div className="relative">
          {/* Glow effect behind number */}
          <div className="absolute inset-0 blur-3xl bg-primary/30 rounded-full scale-150" />
          
          {/* The number */}
          <div className={cn(
            "relative text-8xl sm:text-9xl font-display font-bold text-primary",
            "drop-shadow-[0_0_30px_hsl(45_80%_55%/0.5)]"
          )}>
            {number}
          </div>
        </div>

        {/* Decorative stars */}
        <div className="mt-8 flex justify-center gap-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-6 h-6 text-primary animate-sparkle"
              style={{ animationDelay: `${i * 0.2}s` }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
            </svg>
          ))}
        </div>

        <p className="mt-6 text-muted-foreground text-sm">
          Click anywhere to continue
        </p>
      </div>
    </div>
  );
};
