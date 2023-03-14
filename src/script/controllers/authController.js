import MESSAGE from "../constants/message";
import { KEY } from "../constants/type";
import { getLocalStorage, setLocalStorage } from "../helper/handlelocalStorage";
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
    const AuthModel = this.model;
    const index = user.email.indexOf("@");

    delete user.password;
    const userJson = JSON.stringify(user);

    const userName = user.email.slice(0, index);
    window.location.search = userName;
    AppView.createToast(TOAST.SUCCESS(MESSAGE.LOGIN_SUCCESS));

    setLocalStorage(KEY.LOCALSTORAGE_UESR, userJson);

    AppView.showTodoPage();
  }

  handleCheckLogin = async () => {
    try {
      const Auth = this.model;
      const AppView = this.appView;

      const userJson = getLocalStorage(KEY.LOCALSTORAGE_UESR);

      if (!userJson) {
        AppView.createLogin();
        return;
      }

      const user = await Auth.fildEmailUser(userJson);
      if (user) {
        AppView.createTodoPage();
      }
    } catch (error) {
      AppView.createToast(TOAST.ERROR(error));
    }
  };
}

export default AuthController;
