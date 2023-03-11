import { KEY } from "../constants/type";

class AuthController {
  constructor(model, view, appView) {
    this.model = model;
    this.view = view;
    this.appView = appView;

    this.handleCheckLogin();
    this.view.getLoginForm(this.handleLogin);
  }
  handleLogin = async (data) => {
    const Auth = this.model;
    const AppView = this.appView;

    try {
      const [user] = await Auth.findLoginUser(data);
      if (user) {
        delete user.password;
        const userJson = JSON.stringify(user);

        localStorage.setItem(KEY.LOCALSTORAGE_UESR, userJson);

        AppView.showTodoPage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleCheckLogin() {
    const Auth = this.model;
    const AppView = this.appView;

    const userJson = JSON.parse(localStorage.getItem(KEY.LOCALSTORAGE_UESR));

    if (!userJson) return;
    const user = Auth.fildEmailUser(userJson);

    if (user) {
      AppView.createTodoPage();
    }
  }
}

export default AuthController;
