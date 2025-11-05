import Button from "@components/button/Button";

interface RankingControlsProps {
  onClear: () => void;
}

export default function RankingControls({ onClear }: RankingControlsProps) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="heading-sb-20 text-gray-900">랭킹 보드</h2>

      <Button
        variant="secondary"
        size="default"
        onClick={onClear}
        className="bg-red text-white hover:bg-red/90"
      >
        기록 초기화
      </Button>
    </div>
  );
}
