import { cn } from "@utils/cn";
import type { Card } from "@pages/home/@section/(.)board-section/types/Card";

interface CardProps {
  card: Card;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  disabled: boolean;
}

export default function Card({
  card,
  isFlipped,
  isMatched,
  onClick,
  disabled,
}: CardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isFlipped || isMatched}
      className={cn(
        "relative w-full aspect-square rounded-2xl transition-transform duration-500 transform-3d",
        disabled || isFlipped || isMatched
          ? "cursor-default"
          : "cursor-pointer hover:scale-105",
        (isFlipped || isMatched) && "rotate-y-180"
      )}
    >
      {/* 카드 뒷면 */}
      <div
        className={cn(
          "card-layout  bg-blue-gray-500 text-white   backface-hidden rotate-y-0",
          (isFlipped || isMatched) && "opacity-0"
        )}
      >
        ?
      </div>

      {/* 카드 앞면 */}
      <div
        className={cn(
          "card-layout  bg-blue-gray-100 text-blue-gray-500   backface-hidden rotate-y-180",
          (isFlipped || isMatched) && "opacity-100"
        )}
      >
        {card.value}
      </div>
    </button>
  );
}
