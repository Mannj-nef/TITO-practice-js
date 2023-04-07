import { FORM } from "../constants/type";
import debounce from "./debounce";
import { validate } from "./validate";

export const handleFormLogin = (formElm, handler, type = FORM.LOGIN) => {
  const formClassName = ".form-input";
  validate(formElm, formClassName);

  formElm.addEventListener("submit", function (e) {
    const inputElms = formElm.querySelectorAll(".form-input");
    e.preventDefault();

    const valueItem = {
      email: this.elements.email.value.trim().toLowerCase(),
      password: this.elements.password.value.trim(),
    };

    if (type === FORM.RESGITER) {
      valueItem.confirmPassword = this.elements["confirm-password"].value;
    }

    const invalid = [...inputElms].some((item) =>
      item.classList.contains("invalid")
    );
    const emptyValue = Object.values(valueItem).some((value) => value <= 0);

    if (!invalid && !emptyValue) {
      const button = formElm.querySelector(".submit-form");
      button.classList.add("button-loading");

      const submitForm = () => {
        button.classList.remove("button-loading");

        if (typeof handler === "function") {
          handler(valueItem);
        }
      };
      debounce(submitForm, 2000);
    }
  });
};

export const handleFormTodo = (formElm, disableElm, handle) => {
  formElm.addEventListener("submit", function (e) {
    e.preventDefault();
    const actionElm = formElm.querySelector(".action-todo");
    const input = this.elements["input-todo"];

    const action = actionElm.textContent;
    const inputValue = input.value.trim();

    if (inputValue <= 0) {
      input.value = "";
      return;
    }

    const button = formElm.querySelector(".main-btn");
    button.classList.add("button-loading");
    const handleSubmit = () => {
      button.classList.remove("button-loading");
      if (typeof handle === "function") {
        handle(inputValue, action);
        input.value = "";
      }
    };

    disableElm();

    debounce(handleSubmit, 800);
  });
};
