import type { LEVELS } from "@pages/home/@section/(.)board-section/constants/level";

export interface Result {
  isWin: boolean;
  level: keyof typeof LEVELS;
  clearTime: number;
}
