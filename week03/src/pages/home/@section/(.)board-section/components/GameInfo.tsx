import { LEVELS } from "@pages/home/@section/(.)board-section/constants/level";
import { cn } from "@utils/cn";
import type { Card } from "@pages/home/@section/(.)board-section/types/Card";

interface HistoryItem {
  pair: [Card["value"], Card["value"]];
  success: boolean;
  timestamp: number;
}

interface GameInfoProps {
  level: keyof typeof LEVELS;
  timeRemaining: number;
  matchedPairs: number;
  remainingPairs: number;
  message: string;
  history: HistoryItem[];
  isPlaying: boolean;
  onLevelChange: (level: keyof typeof LEVELS) => void;
}

export default function GameInfo({
  level,
  timeRemaining,
  matchedPairs,
  remainingPairs,
  message,
  history,
  isPlaying,
  onLevelChange,
}: GameInfoProps) {
  return (
    <div className="w-[30rem] flex flex-col gap-[2rem]">
      {/* 레벨 선택 */}
      <div className="flex flex-col gap-[1rem]">
        <label className="font-size-base font-bold text-gray-900">
          레벨 선택
        </label>
        <select
          value={level}
          onChange={(e) =>
            onLevelChange(Number(e.target.value) as keyof typeof LEVELS)
          }
          disabled={isPlaying}
          className="p-[1rem] rounded-[1rem] border border-gray-300 font-size-base bg-white"
        >
          {Object.values(LEVELS).map((level, index) => (
            <option key={index} value={index + 1}>
              Level {index + 1}: {level.rows}x{level.cols} ({level.pairs}
              쌍) - {level.timeLimit}초
            </option>
          ))}
        </select>
      </div>

      {/* 게임 정보 */}
      <div className="flex flex-col gap-[1rem] bg-gray-100 p-[1.5rem] rounded-[1rem]">
        <div className="flex justify-between items-center font-size-base font-bold text-gray-900">
          <span>남은 시간</span>
          <span>{timeRemaining}초</span>
        </div>
        <div className="flex justify-between items-center font-size-base font-bold text-gray-900">
          <span>성공한 짝</span>
          <span>
            {matchedPairs}/{LEVELS[level].pairs}
          </span>
        </div>
        <div className="flex justify-between items-center font-size-base font-bold text-gray-900">
          <span>남은 짝</span>
          <span>{remainingPairs}</span>
        </div>
      </div>

      {/* 안내 메시지 */}
      <div className="bg-blue-gray-100 p-[1.5rem] rounded-[1rem]">
        <h3 className="font-size-base font-bold text-gray-900 mb-[1rem]">
          안내 메시지
        </h3>
        <p className="font-size-sm text-gray-700">{message}</p>
      </div>

      {/* 최근 히스토리 */}
      <div className="bg-gray-200 p-[1.5rem] rounded-[1rem]">
        <h3 className="font-size-base font-bold text-gray-900 mb-[1rem]">
          최근 히스토리
        </h3>

        <div className="flex flex-col gap-[0.5rem]">
          {history.map(({ pair, success, timestamp }) => (
            <div
              key={timestamp}
              className={cn(
                "flex justify-between items-center p-[0.8rem] rounded-[0.5rem]",
                success ? "bg-green bg-opacity-20" : "bg-red bg-opacity-20"
              )}
            >
              <span className="font-size-sm">
                {pair[0]}, {pair[1]}
              </span>
              <span
                className={cn(
                  "font-size-sm font-bold",
                  success ? "text-green" : "text-red"
                )}
              >
                {success ? "성공" : "실패"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
