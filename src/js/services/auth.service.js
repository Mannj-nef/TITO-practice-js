import axios from "axios";
import AuthSchema from "../models/authModel";

import AppView from "../views/appView";
import { KEY, PAGE } from "../constants/type";
import MESSAGE from "../constants/message";
import { setLocalStorage } from "../helper/localStorage";
import TOAST from "../helper/toast";

class AuthService {
  constructor() {
    this.user = {};
    this.AppView = new AppView();
    this.endpoint = `${process.env.BASE_URL}/users`;
  }

  async getUsers() {
    const endpointUrl = this.endpoint;

    try {
      const { data } = await axios.get(endpointUrl);
      return data;
    } catch (error) {
      this.AppView.createToast();
      return null;
    }
  }

  async findLoginUser({ email, password }) {
    const condition = (user) =>
      user.email === email && user.password === password;

    try {
      const user = await this.findUser(condition);

      if (!user) {
        this.AppView.createToast(TOAST.ERROR(MESSAGE.ACCOUNT_NOT_EXISTS));
        return null;
      }

      return user;
    } catch (error) {
      this.AppView.createToast(TOAST.ERROR(error));
      return null;
    }
  }

  async fildEmailUser({ email }) {
    const condition = (user) => email === user.email;
    try {
      const user = await this.findUser(condition);

      return user;
    } catch (error) {
      this.AppView.createToast(TOAST.ERROR(error));
      return null;
    }
  }

  async findUser(condition) {
    const users = await this.getUsers();
    const user = users.filter(condition);
    this.user = user.length > 0 ? new AuthSchema(...user) : {};

    return user;
  }

  async registerUser({ email, password }) {
    const endpointUrl = this.endpoint;

    try {
      const { data } = await axios.post(endpointUrl, { email, password });
      this.user = new AuthSchema(data);

      return data;
    } catch (error) {
      this.AppView.createToast(TOAST.ERROR(error));
      return null;
    }
  }

  loginSuccess = (user) => {
    setLocalStorage(KEY.LOCALSTORAGE_UESR, user);
    this.AppView.createToast(TOAST.SUCCESS(MESSAGE.LOGIN_SUCCESS));

    this.AppView.showPage("login", PAGE.TODO);
  };

  accountExists = (hasUser) => {
    if (hasUser.length > 0) {
      this.AppView.createToast(TOAST.ERROR(MESSAGE.ACCOUNT_EXISTS));
    }
  };
}

export default AuthService;
