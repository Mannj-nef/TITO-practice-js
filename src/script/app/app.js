import AuthController from "../controllers/authController";
import TodoController from "../controllers/todoController";
import AuthModel from "../models/authModel";
import TodoModel from "../models/todoModel";
import AppView from "../views/appView";
import AuthView from "../views/authView";
import TodoView from "../views/todoView";

const app = AppView;
const todo = new TodoController(TodoModel, TodoView, AppView);
const auth = new AuthController(AuthModel, AuthView, AppView);
