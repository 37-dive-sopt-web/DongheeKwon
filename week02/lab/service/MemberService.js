/**
 * 회원 Create, Delete 작업을 담당하는 서비스 클래스
 */
export class MemberService {
  constructor(memberRepository) {
    this.memberRepository = memberRepository;
  }

  addMember(memberData) {
    this.memberRepository.add(memberData);
  }

  deleteSelectedMembers(memberIds) {
    this.memberRepository.deleteByIds(memberIds);
  }
}
