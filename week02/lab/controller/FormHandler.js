import { mapFormDataToMember } from "../utils/formMapper.js";
import { validateMemberForm } from "../utils/formValidator.js";

/**
 * 폼 데이터 수집, 검증, 제출 처리를 담당하는 클래스
 */
export class FormHandler {
  constructor(memberService) {
    this.memberService = memberService;
  }

  collectFormData(formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return {};

    const data = {};
    const inputs = form.querySelectorAll("input, select");
    inputs.forEach((input) => {
      if (input.type === "radio") {
        if (input.checked) {
          data[input.name] = input.value;
        }
      } else if (input.type === "checkbox") {
        data[input.name] = input.checked;
      } else {
        data[input.name || input.id] = input.value;
      }
    });

    return data;
  }

  resetForm(formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    const inputs = form.querySelectorAll("input, select");
    inputs.forEach((input) => {
      if (
        input.type === "text" ||
        input.type === "email" ||
        input.type === "password"
      ) {
        input.value = "";
      } else if (input.type === "radio" || input.type === "checkbox") {
        input.checked = false;
      } else if (input.tagName === "SELECT") {
        input.selectedIndex = 0;
      }
    });
  }

  handleModalSubmit(formSelector, onSuccess) {
    const formData = this.collectFormData(formSelector);
    const memberData = mapFormDataToMember(formData, true);

    const validation = validateMemberForm(memberData);

    if (!validation.isValid) {
      alert(
        `다음 필드는 필수 입력 항목입니다:\n${validation.emptyFields
          .map((field) => field.label)
          .join(", ")}`
      );
      return;
    }

    const success = this.memberService.addMember(memberData);

    if (success) {
      alert("회원이 성공적으로 추가되었습니다.");
      if (onSuccess) onSuccess();
    } else {
      alert("회원 추가에 실패했습니다.");
    }
  }

  handleFilterSubmit(formSelector, onFilter) {
    const filterData = this.collectFormData(formSelector);
    const filter = mapFormDataToMember(filterData, false);

    Object.keys(filter).forEach((key) => {
      if (!filter[key] || filter[key].trim() === "") {
        delete filter[key];
      }
    });

    if (onFilter) onFilter(filter);
  }

  handleFormReset(formSelector, onReset) {
    this.resetForm(formSelector);
    if (onReset) onReset();
  }
}
