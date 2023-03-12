import axios from "axios";

class TodoModel {
  constructor() {
    this.todos = [];
    this.endpoint = `${process.env.BASE_URL}/todoList`;
  }
  async getAlltodo() {
    const endpointUrl = this.endpoint;
    const { data } = await axios.get(endpointUrl);

    if (data) {
      data.forEach((item) => {
        this.todos.push(...item.todos);
      });
    }
  }

  async getTodoByEmail(email) {
    const endpointUrl = this.endpoint;
    const { data } = await axios.get(endpointUrl);

    if (data) {
      const [user] = data.filter((item) => item.email === email);
      this.todos.push(...user.todos);
    }
  }
}

export default new TodoModel();
