import { members } from "../constant/members.js";
import { StorageManager } from "../service/StorageManager.js";

/**
 * 회원 데이터 접근을 담당하는 클래스
 */

export class MemberRepository {
  constructor() {
    this.storageManager = new StorageManager("memberData");
    this.members = this.load();
  }

  load() {
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

  save() {
    const success = this.storageManager.save(this.members);
    if (!success) {
      alert("실패");
    }
  }

  findByFilter(filter = {}) {
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

  add(memberData) {
    const newMember = {
      id: Date.now().toString(),
      ...memberData,
      createdAt: new Date().toISOString(),
    };
    this.members.push(newMember);
    this.save();
  }

  deleteByIds(ids) {
    this.members = this.members.filter((member) => !ids.includes(member.id));
    this.save();
  }
}
