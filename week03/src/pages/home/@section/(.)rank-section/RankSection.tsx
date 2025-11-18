import { useState, useEffect } from "react";
import {
  getRankings,
  clearRankings,
} from "@pages/home/@section/(.)rank-section/utils/storage";
import type { RankingRecord } from "@pages/home/@section/(.)rank-section/types/Ranking";
import RankingControls from "@pages/home/@section/(.)rank-section/components/RankingControls";
import RankingTable from "@pages/home/@section/(.)rank-section/components/RankingTable";
import { useModal } from "@pages/home/@modal/hooks/use-modal";
import Modal from "@pages/home/@modal/Modal";

export default function RankSection() {
  const [rankings, setRankings] = useState<RankingRecord[]>([]);
  const { modal, openModal, closeModal } = useModal();

  const loadRankings = () => {
    const data = getRankings();
    setRankings(data);
  };

  useEffect(() => {
    loadRankings();
  }, []);

  const handleClear = () => {
    openModal("기록 초기화되었습니다.");
    clearRankings();
    loadRankings();
  };

  return (
    <section className="flex flex-col gap-6 p-6">
      <RankingControls onClear={handleClear} />
      <RankingTable rankings={rankings} />
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        description={modal.description}
      />
    </section>
  );
}
