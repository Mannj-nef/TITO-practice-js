import MESSAGE from "../constants/message";
import { KEY, PAGE } from "../constants/type";
import { getLocalStorage, setLocalStorage } from "../helper/handlelocalStorage";
import TOAST from "../helper/handleToast";

class AuthController {
  constructor({
    AuthModel,
    AuthView,
    AppView,
    TodoController,
    TodoModel,
    TodoView,
  }) {
    this.model = AuthModel;
    this.view = AuthView;
    this.appView = AppView;

    this.todoControll = TodoController;
    this.todoModel = TodoModel;
    this.todoView = TodoView;

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
      if (hasUser.length > 0) {
        AppView.createToast(TOAST.ERROR(MESSAGE.ACCOUNT_EXISTS));
      } else {
        const user = await Auth.registerUser(data);
        if (user) {
          this.handleLoginSuccess(user);
        }
      }
    } catch (error) {
      AppView.createToast(TOAST.ERROR(error));
    }
  };

  handleLoginSuccess(user) {
    const AppView = this.appView;
    const todoModel = this.todoModel;
    const todoView = this.todoView;

    delete user.password;
    setLocalStorage(KEY.LOCALSTORAGE_UESR, user);
    AppView.createToast(TOAST.SUCCESS(MESSAGE.LOGIN_SUCCESS));

    AppView.showPage("login", PAGE.TODO);
    const todoPage = document.querySelector(".todo-page");
    if (todoPage) {
      const todoControll = new this.todoControll(
        new todoModel(),
        todoView,
        AppView
      );

      todoControll.handleRenderTodo();
    }
  }

  handleCheckLogin = async () => {
    try {
      const Auth = this.model;
      const AppView = this.appView;
      const todoModel = this.todoModel;
      const todoView = this.todoView;

      const userJson = getLocalStorage(KEY.LOCALSTORAGE_UESR);

      if (!userJson) {
        AppView.createLogin();
        return;
      }

      const user = await Auth.fildEmailUser(userJson);
      if (user) {
        AppView.createTodoPage();
        const todoControll = new this.todoControll(
          new todoModel(),
          todoView,
          AppView
        );

        todoControll.handleRenderTodo();
      }
    } catch (error) {
      AppView.createToast(TOAST.ERROR(error));
    }
  };
}

export default AuthController;
