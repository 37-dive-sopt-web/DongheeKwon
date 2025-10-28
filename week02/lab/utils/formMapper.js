/**
 * 폼 데이터를 회원 객체로 변환하는 함수
 */
export function mapFormDataToMember(formData, isModal = false) {
  const memberData = {};
  const prefix = isModal ? "modal-" : "";

  [
    "name",
    "englishName",
    "github",
    "gender",
    "role",
    "codeReviewGroup",
    "age",
  ].forEach((key) => {
    const formKey = isModal ? `${prefix}${key}` : key;
    memberData[key] = formData[formKey];
  });

  return memberData;
}
