import Modal from "@pages/home/@modal/Modal";
import GameBoard from "@pages/home/@section/(.)board-section/components/GameBoard";
import GameInfo from "@pages/home/@section/(.)board-section/components/GameInfo";
import { useMemoryGame } from "@pages/home/@section/(.)board-section/hooks/use-memory-game";
import { useModal } from "@pages/home/@modal/hooks/use-modal";
import { saveRanking } from "@pages/home/@section/(.)rank-section/utils/storage";
import { LEVELS } from "@pages/home/@section/(.)board-section/constants/level";

export default function BoardSection() {
  const { modal, openModal, closeModal } = useModal();

  const {
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
  } = useMemoryGame((isWin) => {
    // 게임 종료 시 결과 저장 및 모달 열기
    openModal(isWin ? "축하합니다! 🎉" : "시간 초과 😢");
    // 승리 시 랭킹 저장
    if (isWin) {
      saveRanking({
        level,
        clearTime: Math.round(
          LEVELS[level as keyof typeof LEVELS].timeLimit - timeRemaining
        ),
        timestamp: new Date(),
      });
    }
  });

  // modal이 닫히면 게임 초기화하고 랭킹 업데이트
  const handleModalClose = () => {
    closeModal();

    // 게임 초기화
    setTimeout(() => {
      handleReset();
    }, 3000);
  };

  return (
    <div className="flex gap-[2rem] p-[2rem]">
      {/* 왼쪽: 게임 보드 */}
      <GameBoard
        cards={cards}
        cols={cols}
        onReset={handleReset}
        flippedCardsIds={flippedCardsIds}
        matchedCardsIds={matchedCardsIds}
        onCardClick={handleCardClick}
      />

      {/* 오른쪽: 게임 정보 */}
      <GameInfo
        level={level}
        timeRemaining={timeRemaining}
        matchedPairs={matchedPairs}
        remainingPairs={remainingPairs}
        message={message}
        history={history}
        isPlaying={isPlaying}
        onLevelChange={handleLevelChange}
      />

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={handleModalClose}
        title={modal.title}
        description={modal.description}
      />
    </div>
  );
}
