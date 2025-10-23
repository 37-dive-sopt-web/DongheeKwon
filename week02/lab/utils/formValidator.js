/**
 * 폼 데이터 검증 함수
 */
export function validateMemberForm(formData) {
  const requiredFields = [
    { key: "name", label: "이름" },
    { key: "englishName", label: "영문이름" },
    { key: "github", label: "깃허브" },
    { key: "gender", label: "성별" },
    { key: "role", label: "역할" },
    { key: "codeReviewGroup", label: "금잔디조" },
    { key: "age", label: "나이" },
  ];

  const emptyFields = requiredFields.filter(
    (field) => !formData[field.key] || formData[field.key].trim() === ""
  );

  return {
    isValid: emptyFields.length === 0,
    emptyFields: emptyFields,
  };
}
