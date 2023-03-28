import LoginPage from "./pages/LoginPage";
import SignIn from "./modules/signIn/SignIn";
import SignUp from "./modules/signUp/SignUp";
import TodoPage from "./pages/TodoPage";
import { PAGE } from "../constants/type";
import debounce from "../helper/debounce";

class AppView {
  createLogin = () => {
    const app = document.getElementById("root");
    app.innerHTML = LoginPage(SignIn, SignUp);
  };

  createTodoPage = () => {
    const app = document.getElementById("root");
    app.innerHTML = TodoPage();
  };

  createToast = (data) => {
    const toast = document.getElementById("toast");
    toast.innerHTML = data;

    debounce(() => {
      toast.innerHTML = "";
    }, 4000);
  };

  showPage(classCurentPage, newPage) {
    const curentPage = document.querySelector(`.${classCurentPage}`);

    if (!curentPage) return;

    if (newPage === PAGE.TODO) {
      this.createTodoPage();
    } else if (newPage === PAGE.LOGIN) {
      this.createLogin();
    }
  }
}

export default new AppView();
