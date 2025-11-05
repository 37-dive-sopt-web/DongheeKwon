import { useState, useEffect } from "react";
import { generateCardDeck } from "@pages/home/@section/(.)board-section/utils/build-card-deck";
import { shuffleArray } from "@pages/home/@section/(.)board-section/utils/shuffle-array";
import { LEVELS } from "@pages/home/@section/(.)board-section/constants/level";
import type { Card } from "@pages/home/@section/(.)board-section/types/Card";
import { MESSAGE } from "@pages/home/@section/(.)board-section/constants/message";

interface HistoryItem {
  pair: [Card["value"], Card["value"]];
  success: boolean;
  timestamp: number;
}

export const useMemoryGame = (onGameOver?: (isWin: boolean) => void) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [level, setLevel] = useState<keyof typeof LEVELS>(1);
  const [flippedCardsIds, setFlippedCardsIds] = useState<Set<Card["id"]>>(
    new Set()
  );
  const [matchedCardsIds, setMatchedCardsIds] = useState<Set<Card["id"]>>(
    new Set()
  );
  const [timeRemaining, setTimeRemaining] = useState<number>(
    LEVELS[1].timeLimit
  );
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);
  const [message, setMessage] = useState<string>(MESSAGE.GAME_START);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const initializeDeck = (newLevel: keyof typeof LEVELS) => {
    const cardDeck = generateCardDeck(newLevel);
    const shuffledCards: Card[] = shuffleArray<Card>(cardDeck);
    setCards(shuffledCards);
    setLevel(newLevel);
    setFlippedCardsIds(new Set());
    setMatchedCardsIds(new Set());
    setTimeRemaining(LEVELS[newLevel].timeLimit);
    setGameStartTime(null);
    setHistory([]);
    setMessage(MESSAGE.GAME_START);
  };

  useEffect(() => {
    initializeDeck(1);
  }, []);

  // 게임 시작
  const startGame = () => {
    if (gameStartTime === null) {
      setGameStartTime(Date.now());
      setMessage(MESSAGE.GAME_PLAYING);
    }
  };

  // 게임 종료
  const endGame = () => {
    if (gameStartTime === null) return;

    setGameStartTime(null);
    onGameOver?.(matchedCardsIds.size === pairs * 2);
  };

  // 타이머 관리
  useEffect(() => {
    if (!gameStartTime) return;

    const { timeLimit } = LEVELS[level];

    const interval = setInterval(() => {
      const elapsedSec = Math.floor((Date.now() - gameStartTime) / 1000);
      const remaining = timeLimit - elapsedSec;

      if (remaining <= 0) {
        setTimeRemaining(0);
        endGame();
        clearInterval(interval);
      } else {
        setTimeRemaining(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStartTime, level]);

  // 모든 짝을 맞췄는지 확인
  useEffect(() => {
    if (gameStartTime === null) return;

    const { pairs } = LEVELS[level];
    const allPairsMatched = matchedCardsIds.size === pairs * 2;

    if (allPairsMatched) {
      endGame();
    }
  }, [matchedCardsIds.size, level, gameStartTime]);

  const handleCardClick = (cardId: Card["id"]) => {
    startGame();

    if (flippedCardsIds.has(cardId) || matchedCardsIds.has(cardId)) {
      setMessage(MESSAGE.GAME_ALREADY_SELECTED);
      return;
    }
    if (flippedCardsIds.size >= 2) {
      setMessage(MESSAGE.GAME_CAN_ONLY_FLIP_2_CARDS);
      return;
    }

    const newFlipped = new Set(flippedCardsIds);
    newFlipped.add(cardId);
    setFlippedCardsIds(newFlipped);
    setMessage("");

    if (newFlipped.size === 2) {
      const [id1, id2] = Array.from(newFlipped);
      const card1 = cards.find((c) => c.id === id1);
      const card2 = cards.find((c) => c.id === id2);
      if (!card1 || !card2) return;

      const isMatch = card1.value === card2.value;

      setHistory((prev) => [
        {
          pair: [card1.value, card2.value],
          success: isMatch,
          timestamp: Date.now(),
        },
        ...prev,
      ]);

      if (isMatch) {
        setMatchedCardsIds((prev) => {
          const next = new Set(prev);
          next.add(id1);
          next.add(id2);
          return next;
        });
        setFlippedCardsIds(new Set());
        setMessage(MESSAGE.GAME_MATCH_FOUND);
      } else {
        setMessage(MESSAGE.GAME_MATCH_NOT_FOUND);
        setTimeout(() => setFlippedCardsIds(new Set()), 700);
      }
    }
  };

  // 게임 리셋 및 초기화
  const handleReset = () => {
    initializeDeck(level);
  };

  // 레벨 변경
  const handleLevelChange = (newLevel: keyof typeof LEVELS) => {
    if (gameStartTime) {
      setMessage(MESSAGE.GAME_CANNOT_CHANGE_LEVEL);
      return;
    }
    initializeDeck(newLevel);
  };

  // 계산된 값들
  const { cols, pairs } = LEVELS[level];
  const matchedPairs = matchedCardsIds.size / 2;
  const remainingPairs = pairs - matchedPairs;
  const isPlaying = gameStartTime !== null;

  return {
    cards,
    level,
    flippedCardsIds,
    matchedCardsIds,
    timeRemaining,
    message,
    history,
    cols,
    matchedPairs,
    remainingPairs,
    isPlaying,
    handleCardClick,
    handleReset,
    handleLevelChange,
  };
};
