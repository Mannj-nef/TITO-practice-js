import LoginPage from "./pages/LoginPage";
import SignIn from "./modules/signIn/SignIn";
import SignUp from "./modules/signUp/SignUp.js";
import Toast from "./components/toast";

class AppView {
  constructor() {
    this.createLogin();
    this.createTodoPage();
    this.createToast();
  }
  createLogin() {
    const app = document.getElementById("root");
    app.innerHTML = LoginPage(SignIn, SignUp);
  }
  createTodoPage() {
    const app = document.getElementById("root");
  }
  createToast() {
    const app = document.getElementById("toast");
    app.innerHTML = Toast();
  }
}

export default new AppView();
