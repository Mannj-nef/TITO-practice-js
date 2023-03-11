import { FORM } from "../constants/type";
import VALIDATE from "../constants/validateSchema";

function handleForm(formElm, type = FORM.LOGIN, handler) {
  if (!formElm) return;

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
    }, 2000);
  });
}

function validate(formElm) {
  const inputControls = formElm.querySelectorAll(".form-input");
  const regexEmail = VALIDATE.EMAIL;

  [...inputControls].forEach((inputItem) => {
    inputItem.addEventListener("input", (item) => handleInput(item, "input"));
    inputItem.addEventListener("blur", (item) => handleInput(item, "blur"));
    inputItem.addEventListener("focus", (item) => handleInput(item, "focus"));
  });

  function handleInput(item, paramenter) {
    const inputTarget = item.target;
    const valueInput = inputTarget.value;

    if (paramenter === "input") {
      if (valueInput.length === 0) {
        inputTarget.classList.remove("border-invalid");
        inputTarget.classList.remove("invalid");
        return;
      }
      checkInput(inputTarget, valueInput);
    }

    if (paramenter === "blur") {
      checkInput(inputTarget, valueInput);
    }

    if (paramenter === "focus") {
      inputTarget.classList.remove("invalid");
    }
  }

  function checkInput(input, value) {
    const inputName = input.name;
    switch (inputName) {
      case "email":
        const validateEmail = regexEmail.test(value);
        handleValid(validateEmail, input, "invalid");
        break;
      case "password" || "text":
        const validatePassword = value.length >= VALIDATE.PASS_MIN;
        handleValid(validatePassword, input, "invalid");
        break;
      case "confirm-password":
        const validateConfirmPassword = "";
        handleValid(validateConfirmPassword, input, "invalid");
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

export default handleForm;
