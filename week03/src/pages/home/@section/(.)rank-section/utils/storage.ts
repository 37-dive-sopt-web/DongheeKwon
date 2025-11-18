import type { RankingRecord } from "@pages/home/@section/(.)rank-section/types/Ranking";

const RANKING_STORAGE_KEY = "memory-game-ranking";

export const getRankings = (): RankingRecord[] => {
  try {
    const stored = localStorage.getItem(RANKING_STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    const rankings: RankingRecord[] = parsed.map((record: any) => ({
      ...record,
      timestamp: new Date(record.timestamp),
    }));

    return rankings.sort((a, b) => {
      if (a.level !== b.level) {
        return b.level - a.level;
      }
      return a.clearTime - b.clearTime;
    });
  } catch (error) {
    console.error("Failed to get rankings:", error);
    return [];
  }
};

export const saveRanking = (record: RankingRecord): void => {
  try {
    const rankings = getRankings();
    rankings.push(record);
    localStorage.setItem(RANKING_STORAGE_KEY, JSON.stringify(rankings));
  } catch (error) {
    console.error("Failed to save ranking:", error);
  }
};

export const clearRankings = (): void => {
  try {
    localStorage.removeItem(RANKING_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear rankings:", error);
  }
};
