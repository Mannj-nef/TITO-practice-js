import ERROR_VALIDATE from "../constants/errorMessage";
import { FORM } from "../constants/type";
import VALIDATE from "../constants/validateSchema";
import debounce from "./debounce";

export const handleFormLogin = (formElm, handler, type = FORM.LOGIN) => {
  validate(formElm);

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

  function handleInput(e, paramenter, inputs) {
    const inputPassword = inputs[1];
    const inputTarget = e.target;
    const textErrorElm = inputTarget.nextElementSibling;
    const valueInput = inputTarget.value;

    if (paramenter === "input") {
      if (valueInput.length === 0) {
        inputTarget.classList.remove("border-invalid");
        inputTarget.classList.remove("invalid");
      } else {
        if (inputTarget.name === "email") {
          textErrorElm.textContent = ERROR_VALIDATE.EMAIL_NOT_VALID;
        }
        if (inputTarget.name === "password") {
          textErrorElm.textContent = ERROR_VALIDATE.PASS_MIN_LENGTH;
        }
      }
      checkInput(inputTarget, valueInput, inputPassword);
    }

    if (paramenter === "blur") {
      if (valueInput.length <= 0) {
        if (inputTarget.name === "email") {
          textErrorElm.textContent = ERROR_VALIDATE.EMAIL_REQUIRED;
        } else if (inputTarget.name === "password") {
          textErrorElm.textContent = ERROR_VALIDATE.PASS_REQUIRED;
        }
      }
      checkInput(inputTarget, valueInput, inputPassword);
    }

    if (paramenter === "focus") {
      inputTarget.classList.remove("invalid");
    }
  }

  function checkInput(inputTarget, value, inputPassword) {
    const inputName = inputTarget.name;
    const textErrorElm = inputTarget.nextElementSibling;

    switch (inputName) {
      case "email": {
        const validateEmail = regexEmail.test(value);
        handleValid(validateEmail, inputTarget, "invalid");
        break;
      }
      case "password" || "text": {
        const validatePassword = value.length >= VALIDATE.PASS_MIN;
        handleValid(validatePassword, inputTarget, "invalid");
        break;
      }
      case "confirm-password": {
        const passwordValue = inputPassword.value;
        const validateConfirmPassword = value === passwordValue;
        handleValid(validateConfirmPassword, inputTarget, "invalid");
        textErrorElm.textContent = ERROR_VALIDATE.PASS_NOT_MATCH;
        break;
      }

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
