import LoginPage from "./pages/LoginPage";
import SignIn from "./modules/signIn/SignIn";
import SignUp from "./modules/signUp/SignUp.js";

class AuthView {
  constructor() {
    this.createLogin();
    this.handleChangeForm();
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
}

export default new AuthView();
