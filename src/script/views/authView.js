import LoginPage from "./pages/LoginPage";
import SignIn from "./modules/signIn/SignIn";
import SignUp from "./modules/signUp/SignUp.js";
import handleInput from "../helper/handleForm";
import { FORM } from "../constants/type";

class AuthView {
  constructor() {
    this.createLogin();
    this.handleChangeForm();
    this.getLoginForm();
  }

  createLogin() {
    const app = document.getElementById("root");
    app.innerHTML = LoginPage(SignIn, SignUp);
  }

  handleChangeForm() {
    const loginBg = document.querySelector(".login-bg");

    // form login
    const loginForm = document.querySelector("#form-sign-in");
    const registerElm = loginForm.querySelector(".register-link");

    // form register
    const regesterForm = document.querySelector("#form-sign-up");
    const loginElm = regesterForm.querySelector(".login-link");

    registerElm.addEventListener("click", () => {
      loginBg.classList.remove("login-bg-right");
    });

    loginElm.addEventListener("click", () => {
      loginBg.classList.add("login-bg-right");
    });
  }

  getLoginForm(handler) {
    const loginForm = document.querySelector("#form-sign-in");
    const regesterForm = document.querySelector("#form-sign-up");

    handleInput(loginForm, FORM.LOGIN, handler);
    handleInput(regesterForm, FORM.RESGITER, handler);
  }
}

export default new AuthView();
