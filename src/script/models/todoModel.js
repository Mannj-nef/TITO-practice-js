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
    const endpointUrl = `${this.endpoint}?email=${email}`;
    const { data } = await axios.get(endpointUrl);

    if (data) {
      this.todos.push(...data);
    }
  }

  async addTodo(todo) {
    const endpointUrl = this.endpoint;
    await axios.post(endpointUrl, todo);
  }

  async removeTodo(id) {
    const endpointUrl = `${this.endpoint}/${id}`;
    await axios.delete(endpointUrl);
  }
}

export default new TodoModel();
