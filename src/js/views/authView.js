import { handleFormLogin } from "../helper/handleForm";
import { FORM } from "../constants/type";

class AuthView {
  constructor() {
    this.domloadLoginView();
  }

  domloadLoginView() {
    window.addEventListener("load", () => {
      this.handleChangeForm();
      this.handleShowPassword();
    });
  }

  handleChangeForm = () => {
    const loginPage = document.querySelector(".login");
    if (!loginPage) return;
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
  };

  getLoginForm = (handler) => {
    const loginForm = document.querySelector("#form-sign-in");
    if (loginForm) {
      handleFormLogin(loginForm, handler, FORM.LOGIN);
    }
  };

  getRegisterForm = (handler) => {
    const regesterForm = document.querySelector("#form-sign-up");
    if (regesterForm) {
      handleFormLogin(regesterForm, handler, FORM.RESGITER);
    }
  };

  handleShowPassword = () => {
    // sign in
    const loginForm = document.querySelector("#form-sign-in");
    const InputPasswordSignIn = document.querySelector("#password-signIn");
    // sign up
    const regesterForm = document.querySelector("#form-sign-up");
    const InputPasswordSignUp = document.querySelector("#password-signUp");

    if (loginForm || regesterForm) {
      handleShow(loginForm, InputPasswordSignIn);
      handleShow(regesterForm, InputPasswordSignUp);
    }

    function handleShow(formElm, InputPassword) {
      const iconShow = formElm.querySelector(".show-password");
      iconShow.addEventListener("click", () => {
        const inputType = InputPassword.getAttribute("type");
        if (inputType === "password") {
          InputPassword.setAttribute("type", "text");
        } else {
          InputPassword.setAttribute("type", "password");
        }
      });
    }
  };
}

export default new AuthView();
