import { members } from "../constant/members.js";
import { StorageManager } from "../service/StorageManager.js";

/**
 * 회원 데이터 저장소 관리를 담당하는 클래스
 */
export class MemberRepository {
  constructor() {
    this.storageManager = new StorageManager("memberData");
    this.members = this.loadFromStorage();
    this.currentFilter = {};
  }

  loadFromStorage() {
    const data = this.storageManager.load();
    if (data) {
      return data;
    } else {
      const initialData = members.map((member) => ({
        ...member,
        id: member.id.toString(),
        createdAt: new Date().toISOString(),
      }));
      this.storageManager.save(initialData);
      return initialData;
    }
  }

  saveToStorage() {
    const success = this.storageManager.save(this.members);
    if (!success) {
      alert("데이터 저장 실패");
    }
  }

  renderTable() {
    const tbody = document.querySelector(".table tbody");
    if (!tbody) return;

    const filteredMembers = this.getFilteredMembers(this.currentFilter);

    if (filteredMembers.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 2rem; color: #666;">
            ${
              this.members.length === 0
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

  getFilteredMembers(filter = {}) {
    return this.members.filter((member) => {
      if (
        filter.name &&
        !member.name.toLowerCase().includes(filter.name.toLowerCase())
      ) {
        return false;
      }

      if (
        filter.englishName &&
        !member.englishName
          .toLowerCase()
          .includes(filter.englishName.toLowerCase())
      ) {
        return false;
      }

      if (
        filter.github &&
        !member.github.toLowerCase().includes(filter.github.toLowerCase())
      ) {
        return false;
      }

      if (filter.gender && member.gender !== filter.gender) {
        return false;
      }

      if (filter.role && member.role !== filter.role) {
        return false;
      }

      if (
        filter.codeReviewGroup &&
        member.codeReviewGroup.toString() !== filter.codeReviewGroup.toString()
      ) {
        return false;
      }

      if (filter.age && member.age.toString() !== filter.age.toString()) {
        return false;
      }

      return true;
    });
  }

  updateSelectAllCheckbox() {
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

  toggleSelectAll(checked) {
    const memberCheckboxes = document.querySelectorAll(".member-checkbox");
    memberCheckboxes.forEach((checkbox) => {
      checkbox.checked = checked;
    });
  }
}
