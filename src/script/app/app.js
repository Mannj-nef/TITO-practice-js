import AuthController from "../controllers/authController";
import AuthModel from "../models/authModel";
import AppView from "../views/appView";
import AuthView from "../views/authView";
import todoView from "../views/todoView";

const app = AppView;
const todo = todoView;
const auth = new AuthController(AuthModel, AuthView, AppView);
