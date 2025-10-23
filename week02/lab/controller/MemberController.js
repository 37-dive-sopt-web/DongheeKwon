/**
 * 회원 테이블 UI 렌더링 및 이벤트 처리를 담당하는 클래스
 */
export class MemberController {
  constructor(memberRepository, memberService) {
    this.memberRepository = memberRepository;
    this.memberService = memberService;
    this.currentFilter = {};
  }

  renderTable() {
    const tbody = document.querySelector(".table tbody");
    if (!tbody) return;

    const filteredMembers = this.memberRepository.findByFilter(
      this.currentFilter
    );
    const totalMembers = this.memberRepository.members.length;

    if (filteredMembers.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 2rem; color: #666;">
            ${
              totalMembers === 0
                ? "등록된 회원이 없습니다."
                : "검색 결과가 없습니다."
            }
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filteredMembers
      .map(
        (member) => `
      <tr data-member-id="${member.id}">
        <td>
          <input type="checkbox" class="member-checkbox" value="${member.id}">
        </td>
        <td>${member.name}</td>
        <td>${member.englishName}</td>
        <td><a href="https://github.com/${
          member.github
        }" target="_blank" style="color: #007bff; text-decoration: none;">${
          member.github
        }</a></td>
        <td>${member.gender === "male" ? "남" : "여"}</td>
        <td>${member.role}</td>
        <td>${member.codeReviewGroup}</td>
        <td>${member.age}</td>
      </tr>
    `
      )
      .join("");
  }

  applyFilter(filter) {
    this.currentFilter = filter;
    this.renderTable();
  }

  clearFilter() {
    this.currentFilter = {};
    this.renderTable();
  }

  handleMemberCheckboxChange() {
    const selectAllCheckbox = document.querySelector(
      'thead input[type="checkbox"]'
    );
    const memberCheckboxes = document.querySelectorAll(".member-checkbox");

    if (!selectAllCheckbox || memberCheckboxes.length === 0) return;

    const checkedCount = document.querySelectorAll(
      ".member-checkbox:checked"
    ).length;

    selectAllCheckbox.checked = checkedCount === memberCheckboxes.length;
  }

  handleSelectAllChange(checked) {
    const memberCheckboxes = document.querySelectorAll(".member-checkbox");
    memberCheckboxes.forEach((checkbox) => {
      checkbox.checked = checked;
    });
  }

  handleDeleteSelected() {
    const selectedIds = Array.from(
      document.querySelectorAll(".member-checkbox:checked")
    ).map((checkbox) => checkbox.value);

    if (selectedIds.length === 0) {
      alert("삭제할 회원을 선택해주세요.");
      return;
    }

    this.memberService.deleteSelectedMembers(selectedIds);
    alert(`삭제가 완료되었습니다.`);
    this.renderTable();
  }
}
