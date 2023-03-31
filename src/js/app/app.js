import AuthController from "../controllers/authController";
import TodoController from "../controllers/todoController";
import AuthService from "../services/auth.service";
import TodoService from "../services/todo.service";
import AppView from "../views/appView";
import AuthView from "../views/authView";
import TodoView from "../views/todoView";

const param = {
  AuthService,
  AuthView,
  AppView,
  TodoController,
  TodoService,
  TodoView,
};

// eslint-disable-next-line no-unused-vars
const app = AppView;
// eslint-disable-next-line no-unused-vars
const auth = new AuthController(param);
