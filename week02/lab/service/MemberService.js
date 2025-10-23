/**
 * 멤버 CD 작업을 담당하는 서비스 클래스
 */
export class MemberService {
  constructor(memberRepository) {
    this.memberRepository = memberRepository;
  }

  addMember(memberData) {
    try {
      const newMember = {
        id: Date.now().toString(),
        ...memberData,
        createdAt: new Date().toISOString(),
      };

      this.memberRepository.members.push(newMember);
      this.memberRepository.saveToStorage();
      this.memberRepository.renderTable();
      return true;
    } catch (error) {
      alert("회원 추가 실패:", error);
      return false;
    }
  }

  deleteSelectedMembers(memberIds) {
    try {
      this.memberRepository.members = this.memberRepository.members.filter(
        (member) => !memberIds.includes(member.id)
      );
      this.memberRepository.saveToStorage();
      this.memberRepository.renderTable();
    } catch (error) {
      alert("회원 일괄 삭제 실패:", error);
    }
  }
}
