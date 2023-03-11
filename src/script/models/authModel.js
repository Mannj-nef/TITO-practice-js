import axios from "axios";

class AuthModel {
  constructor() {
    this.endpoint = `${process.env.BASE_URL}/users`;
  }

  async getUsers() {
    const endpointUrl = this.endpoint;
    const { data } = await axios.get(endpointUrl);
    return data;
  }

  async findUser(condition) {
    const users = await this.getUsers();
    const user = users.filter(condition);

    return user;
  }

  async findLoginUser({ email, password }) {
    const condition = (user) =>
      user.email === email && user.password === password;
    const user = this.findUser(condition);
    return user;
  }

  async fildEmailUser({ email }) {
    const condition = (user) => {
      email === user.email;
    };
    const user = this.findUser(condition);
    return user;
  }
}

export default new AuthModel();
