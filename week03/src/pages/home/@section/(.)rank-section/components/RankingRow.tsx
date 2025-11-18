interface RankingRowProps {
  rank: number;
  level: number;
  clearTime: number;
  timestampLabel: string;
}

export default function RankingRow({
  rank,
  level,
  clearTime,
  timestampLabel,
}: RankingRowProps) {
  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50">
      <td className="ranking-td">{rank}</td>
      <td className="ranking-td">Level {level}</td>
      <td className="ranking-td">{clearTime}초</td>
      <td className="ranking-td">{timestampLabel}</td>
    </tr>
  );
}
