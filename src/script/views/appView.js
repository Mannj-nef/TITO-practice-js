import LoginPage from "./pages/LoginPage";
import SignIn from "./modules/signIn/SignIn";
import SignUp from "./modules/signUp/SignUp.js";
import Toast from "./components/toast";
import TodoPage from "./pages/TodoPage";
import { PAGE } from "../constants/type";

class AppView {
  constructor() {
    this.createLogin;

    this.createTodoPage;
    this.showPage;
    this.createToast;
  }
  createLogin() {
    const app = document.getElementById("root");
    app.innerHTML = LoginPage(SignIn, SignUp);
  }
  createTodoPage() {
    const app = document.getElementById("root");
    app.innerHTML = TodoPage();
  }
  createToast(data) {
    const toast = document.getElementById("toast");
    toast.innerHTML = data;

    setTimeout(() => {
      toast.innerHTML = "";
    }, 4000);
  }

  showPage(classCurentPage, newPage) {
    const LoginPage = document.querySelector(`.${classCurentPage}`);

    if (!LoginPage) return;
    LoginPage.classList.add("hidden");

    setTimeout(() => {
      switch (newPage) {
        case PAGE.TODO:
          console.log(0);
          this.createTodoPage();
          break;
        case PAGE.LOGIN:
          this.createLogin();
          break;
        default:
          break;
      }
    }, 500);
  }
}

export default new AppView();
