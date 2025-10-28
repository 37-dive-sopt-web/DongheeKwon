import { FormHandler } from "./controller/FormHandler.js";
import { MemberController } from "./controller/MemberController.js";
import { MemberRepository } from "./repository/MemberRepository.js";
import { MemberService } from "./service/MemberService.js";

// 클래스 인스턴스 생성
const memberRepository = new MemberRepository();
const memberService = new MemberService(memberRepository);
const memberController = new MemberController(memberRepository, memberService);
const formHandler = new FormHandler(memberService);

// DOM 요소들
const modalOverlay = document.querySelector(".modal-overlay");
const addButton = document.querySelector(".table-buttons button:first-child");
const modalClose = document.querySelector(".modal-close");
const modalSubmit = document.querySelector(".modal-submit");
const searchButton = document.querySelector(".filter-buttons .search");
const resetButton = document.querySelector(".filter-buttons .reset");

// 초기화
document.addEventListener("DOMContentLoaded", () => {
  const deleteSelectedBtn = document.querySelector(
    ".table-buttons button:last-child"
  );
  if (deleteSelectedBtn) {
    deleteSelectedBtn.addEventListener("click", () => {
      memberController.handleDeleteSelected();
    });
  }
});

addButton.addEventListener("click", () => {
  modalOverlay.classList.add("show");
  formHandler.resetForm(".modal-form");
});

modalClose.addEventListener("click", () => {
  modalOverlay.classList.remove("show");
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("show");
  }
});

modalSubmit.addEventListener("click", () => {
  formHandler.handleModalSubmit(".modal-form", () => {
    modalOverlay.classList.remove("show");
    formHandler.resetForm(".modal-form");
    memberController.renderTable();
  });
});

searchButton.addEventListener("click", () => {
  formHandler.handleFilterSubmit(".filter-content", (filter) => {
    memberController.applyFilter(filter);
  });
});

resetButton.addEventListener("click", () => {
  formHandler.handleFormReset(".filter-content", () => {
    memberController.clearFilter();
  });
});

document.addEventListener("change", (e) => {
  if (e.target.classList.contains("member-checkbox")) {
    memberController.handleMemberCheckboxChange();
  } else if (e.target.closest("thead") && e.target.type === "checkbox") {
    memberController.handleSelectAllChange(e.target.checked);
  }
});

//시작
memberController.renderTable();
