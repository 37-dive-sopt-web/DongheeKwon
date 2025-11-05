import type { Card } from "@pages/home/@section/(.)board-section/types/Card";
import CardComponent from "@pages/home/@section/(.)board-section/components/Card";
import Button from "@components/button/Button";

interface GameBoardProps {
  cards: Card[];
  cols: number;
  flippedCardsIds: Set<Card["id"]>;
  matchedCardsIds: Set<Card["id"]>;
  onCardClick: (cardId: Card["id"]) => void;
  onReset: () => void;
}

export default function GameBoard({
  cards,
  cols,
  flippedCardsIds,
  matchedCardsIds,
  onCardClick,
  onReset,
}: GameBoardProps) {
  return (
    <div className="flex flex-col flex-1 gap-[1rem]">
      <div className="flex justify-between items-center">
        <h2 className="heading-sb-20  text-gray-900">게임 보드</h2>
        <Button variant="primary" size="sm" onClick={onReset}>
          게임 리셋
        </Button>
      </div>
      <div
        className="grid gap-[1rem]"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
      >
        {cards.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            isFlipped={flippedCardsIds.has(card.id)}
            isMatched={matchedCardsIds.has(card.id)}
            onClick={() => onCardClick(card.id)}
            disabled={false}
          />
        ))}
      </div>
    </div>
  );
}
