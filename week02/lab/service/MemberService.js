/**
 * 회원 Create, Delete 작업을 담당하는 서비스 클래스
 */
export class MemberService {
  constructor(memberRepository) {
    this.memberRepository = memberRepository;
  }

  addMember(memberData) {
    try {
      this.memberRepository.add(memberData);
      return true;
    } catch (error) {
      console.error("회원 추가 중 오류 발생:", error);
      return false;
    }
  }

  deleteSelectedMembers(memberIds) {
    try {
      this.memberRepository.deleteByIds(memberIds);
      return true;
    } catch (error) {
      console.error("회원 삭제 중 오류 발생:", error);
      return false;
    }
  }
}
