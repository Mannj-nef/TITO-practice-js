import axios from "axios";

class AuthSchema {
  constructor({ id, email, password }) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
}

class AuthModel {
  constructor() {
    this.user = {};
    this.endpoint = `${process.env.BASE_URL}/users`;
  }

  async getUsers() {
    const endpointUrl = this.endpoint;
    const { data } = await axios.get(endpointUrl);
    return data;
  }

  async findLoginUser({ email, password }) {
    const condition = (user) =>
      user.email === email && user.password === password;
    const user = await this.findUser(condition);
    return user;
  }

  async fildEmailUser({ email }) {
    const condition = (user) => email === user.email;
    const user = await this.findUser(condition);
    return user;
  }

  async findUser(condition) {
    const users = await this.getUsers();
    const user = users.filter(condition);
    this.user = user.length > 0 ? new AuthSchema(...user) : {};

    return user;
  }

  async registerUser({ email, password }) {
    const endpointUrl = this.endpoint;
    const { data } = await axios.post(endpointUrl, { email, password });
    this.user = new AuthSchema(data);

    return data;
  }
}

export default new AuthModel();
