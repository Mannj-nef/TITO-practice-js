import MESSAGE from "../constants/message";
import { KEY } from "../constants/type";
import TOAST from "../helper/handleToast";

class AuthController {
  constructor(model, view, appView) {
    this.model = model;
    this.view = view;
    this.appView = appView;

    this.handleCheckLogin();
    this.view.getLoginForm(this.handleLogin);
    this.view.getRegisterForm(this.handleRegister);
  }
  handleLogin = async (data) => {
    const Auth = this.model;
    const AppView = this.appView;

    try {
      const [user] = await Auth.findLoginUser(data);
      if (user) {
        this.handleLoginSuccess(user);
      } else {
        AppView.createToast(TOAST.ERROR(MESSAGE.ACCOUNT_NOT_EXISTS));
      }
    } catch (error) {
      AppView.createToast(TOAST.ERROR(error));
    }
  };

  handleRegister = async (data) => {
    const Auth = this.model;
    const AppView = this.appView;
    try {
      const hasUser = await Auth.fildEmailUser(data);
      console.log(hasUser);
      if (hasUser.length > 0) {
        AppView.createToast(TOAST.ERROR(MESSAGE.ACCOUNT_EXISTS));
      } else {
        // const user = await Auth.registerUser(data);
        // if (user) {
        //   this.handleLoginSuccess(user);
        // }
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleLoginSuccess(user) {
    const AppView = this.appView;

    delete user.password;
    const userJson = JSON.stringify(user);

    AppView.createToast(TOAST.SUCCESS(MESSAGE.LOGIN_SUCCESS));
    localStorage.setItem(KEY.LOCALSTORAGE_UESR, userJson);

    AppView.showTodoPage();
  }

  handleCheckLogin = async () => {
    const Auth = this.model;
    const AppView = this.appView;

    const userJson = JSON.parse(localStorage.getItem(KEY.LOCALSTORAGE_UESR));

    if (!userJson) return;
    const user = await Auth.fildEmailUser(userJson);

    if (user) {
      AppView.createTodoPage();
    }
  };
}

export default AuthController;
