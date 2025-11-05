import { useState } from "react";
import Button from "@components/button/Button";
import Header from "@components/header/Header";
import { SECTION } from "@pages/home/constants/section";
import BoardSection from "@pages/home/@section/(.)board-section/BoardSection";
import RankSection from "@pages/home/@section/(.)rank-section/RankSection.tsx";

export default function Home() {
  const [section, setSection] = useState<
    (typeof SECTION)[keyof typeof SECTION]
  >(SECTION.BOARD);
  const handleStartGame = () => setSection(SECTION.BOARD);
  const handleRanking = () => setSection(SECTION.RANKING);

  return (
    <div className="flex flex-col gap-[2rem] p-[2rem]">
      <Header
        title="숫자 카드짝 맞추기"
        rightComponent={
          <div className="flex gap-[1rem]">
            <Button
              variant={section === SECTION.BOARD ? "primary" : "secondary"}
              size="default"
              onClick={handleStartGame}
            >
              게임
            </Button>
            <Button
              variant={section === SECTION.RANKING ? "primary" : "secondary"}
              size="default"
              onClick={handleRanking}
            >
              랭킹
            </Button>
          </div>
        }
      />
      {section === SECTION.BOARD && <BoardSection />}
      {section === SECTION.RANKING && <RankSection />}
    </div>
  );
}
