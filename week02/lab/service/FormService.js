class FormService {
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
}

export default FormService;
