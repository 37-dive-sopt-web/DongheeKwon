import { formatDate } from "@pages/home/@section/(.)rank-section/utils/format-date";
import type { RankingRecord } from "@pages/home/@section/(.)rank-section/types/Ranking";
import RankingRow from "@pages/home/@section/(.)rank-section/components/RankingRow";

interface RankingTableProps {
  rankings: RankingRecord[];
}

export default function RankingTable({ rankings }: RankingTableProps) {
  return (
    <table className="w-full border-[1px] border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="ranking-th">순위</th>
          <th className="ranking-th">레벨</th>
          <th className="ranking-th">클리어 시간(초)</th>
          <th className="ranking-th">기록 시각</th>
        </tr>
      </thead>

      <tbody>
        {rankings.length === 0 ? (
          <tr>
            <td colSpan={4} className="ranking-td">
              아직 기록이 없습니다.
            </td>
          </tr>
        ) : (
          rankings.map((record, idx) => (
            <RankingRow
              key={`${record.timestamp}-${idx}`}
              rank={idx + 1}
              level={record.level}
              clearTime={record.clearTime}
              timestampLabel={formatDate(record.timestamp)}
            />
          ))
        )}
      </tbody>
    </table>
  );
}
