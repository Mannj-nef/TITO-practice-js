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
    const curentPage = document.querySelector(`.${classCurentPage}`);

    if (!curentPage) return;

    if (newPage === PAGE.TODO) {
      curentPage.classList.add("login-hidden");
    } else if (newPage === PAGE.LOGIN) {
      curentPage.classList.add("todo-hidden");
    }

    setTimeout(() => {
      if (newPage === PAGE.TODO) {
        this.createTodoPage();
      } else if (newPage === PAGE.LOGIN) {
        this.createLogin();
      }
    }, 600);
  }
}

export default new AppView();
