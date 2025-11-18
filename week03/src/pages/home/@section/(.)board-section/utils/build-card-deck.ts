import { LEVELS } from "@pages/home/@section/(.)board-section/constants/level";
import type { Card } from "@pages/home/@section/(.)board-section/types/Card";

export function generateCardDeck(level: keyof typeof LEVELS = 1): Card[] {
  const { rows, cols } = LEVELS[level];
  const totalCards = rows * cols;

  // 카드 개수는 짝수여야 합니다 (짝 맞추는 게임이니까)
  if (totalCards % 2 !== 0) {
    throw new Error("카드 개수는 짝수여야 합니다.");
  }

  const pairsCount = totalCards / 2;
  const cardValues = Array.from({ length: pairsCount }, (_, i) => i + 1);

  // 각 숫자 값을 2장씩 생성하고, 고유 id를 부여
  const cardDeck: Card[] = [];
  for (let i = 0; i < cardValues.length; i += 1) {
    const value = cardValues[i];
    cardDeck.push({ id: `${value}-a`, value });
    cardDeck.push({ id: `${value}-b`, value });
  }

  return cardDeck;
}
