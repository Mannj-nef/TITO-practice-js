import AuthController from "../controllers/authController";
import AuthModel from "../models/authModel";
import AppView from "../views/appView";
import AuthView from "../views/authView";

const app = AppView;
const auth = new AuthController(AuthModel, AuthView);
