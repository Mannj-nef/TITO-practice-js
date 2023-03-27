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

const app = AppView;
const auth = new AuthController(param);