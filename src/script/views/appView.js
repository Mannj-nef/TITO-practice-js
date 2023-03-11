import LoginPage from "./pages/LoginPage";
import SignIn from "./modules/signIn/SignIn";
import SignUp from "./modules/signUp/SignUp.js";
import Toast from "./components/toast";

class AppView {
  constructor() {
    this.createLogin();

    this.createTodoPage;
    this.showTodoPage;
    this.createToast;
    this.backLoginPage();
  }
  createLogin() {
    const app = document.getElementById("root");
    app.innerHTML = LoginPage(SignIn, SignUp);
  }
  createTodoPage() {
    const app = document.getElementById("root");
    app.innerHTML = "lorem";
  }
  createToast(data) {
    const toast = document.getElementById("toast");
    toast.innerHTML = data;

    setTimeout(() => {
      toast.innerHTML = "";
    }, 4000);
  }

  showTodoPage() {
    const LoginPage = document.querySelector(".login");
    LoginPage.classList.add("login-hidden");

    setTimeout(() => {
      this.createTodoPage();
    }, 500);
  }

  backLoginPage() {}
}

export default new AppView();
