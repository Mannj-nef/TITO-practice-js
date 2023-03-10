import { FORM } from "../constants/type";

function handleInput(formElm, type = FORM.LOGIN, handler) {
  formElm.addEventListener("submit", function (e) {
    e.preventDefault();
    const valueItem = {
      email: this.elements["email"].value.trim(),
      password: this.elements["password"].value.trim(),
    };

    if (type === FORM.RESGITER) {
      valueItem.confirmPassword = this.elements["confirm-password"].value;
    }

    if (typeof handler === "function") {
      handler(valueItem);
    }

    console.log({ valueItem });
  });
}

export default handleInput;
