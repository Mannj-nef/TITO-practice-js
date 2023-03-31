import AuthController from "../controllers/authController";
import TodoController from "../controllers/todoController";
import AuthModel from "../models/authModel";
import TodoModel from "../models/todoModel";
import AppView from "../views/appView";
import AuthView from "../views/authView";
import TodoView from "../views/todoView";

const param = {
  AuthModel,
  AuthView,
  AppView,
  TodoController,
  TodoModel,
  TodoView,
};

// eslint-disable-next-line no-unused-vars
const app = AppView;
// eslint-disable-next-line no-unused-vars
const auth = new AuthController(param);
