import { FORM } from "../constants/type";
import VALIDATE from "../constants/validateSchema";

export const handleFormLogin = (formElm, type = FORM.LOGIN, handler) => {
  validate(formElm);
  formElm.addEventListener("submit", function (e) {
    e.preventDefault();

    const valueItem = {
      email: this.elements["email"].value.trim().toLowerCase(),
      password: this.elements["password"].value.trim(),
    };

    if (type === FORM.RESGITER) {
      valueItem.confirmPassword = this.elements["confirm-password"].value;
    }

    const button = formElm.querySelector(".submit-form");
    button.classList.add("button-loading");

    const timeOut = setTimeout(() => {
      button.classList.remove("button-loading");

      if (typeof handler === "function") {
        handler(valueItem);
      }
    }, 2500);
  });
};

export const handleFormTodo = (formElm, handle) => {
  formElm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = this.elements["input-todo"];
    const inputValue = input.value.trim();

    handle(inputValue);
  });
};

function validate(formElm) {
  const inputControls = formElm.querySelectorAll(".form-input");
  const regexEmail = VALIDATE.EMAIL;

  [...inputControls].forEach((inputItem) => {
    inputItem.addEventListener("input", (e) =>
      handleInput(e, "input", inputControls)
    );
    inputItem.addEventListener("blur", (e) =>
      handleInput(e, "blur", inputControls)
    );
    inputItem.addEventListener("focus", (e) =>
      handleInput(e, "focus", inputControls)
    );
  });

  function handleInput(e, paramenter, inputControls) {
    const inputPassword = inputControls[1];
    const inputTarget = e.target;
    const valueInput = inputTarget.value;

    if (paramenter === "input") {
      if (valueInput.length === 0) {
        inputTarget.classList.remove("border-invalid");
        inputTarget.classList.remove("invalid");
        return;
      }
      checkInput(inputTarget, valueInput, inputPassword);
    }

    if (paramenter === "blur") {
      checkInput(inputTarget, valueInput, inputPassword);
    }

    if (paramenter === "focus") {
      inputTarget.classList.remove("invalid");
    }
  }

  function checkInput(inputTarget, value, inputPassword) {
    const inputName = inputTarget.name;
    switch (inputName) {
      case "email":
        const validateEmail = regexEmail.test(value);
        handleValid(validateEmail, inputTarget, "invalid");
        break;
      case "password" || "text":
        const validatePassword = value.length >= VALIDATE.PASS_MIN;
        handleValid(validatePassword, inputTarget, "invalid");
        break;
      case "confirm-password":
        const passwordValue = inputPassword.value;
        const validateConfirmPassword = value === passwordValue;
        handleValid(validateConfirmPassword, inputTarget, "invalid");
        break;

      default:
        break;
    }
  }

  function handleValid(condition, input, classInvalid) {
    if (condition) {
      input.classList.remove(classInvalid);
    } else {
      input.classList.add(classInvalid);
    }
  }
}
