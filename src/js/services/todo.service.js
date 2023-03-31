import axios from "axios";
import TodoSchema from "../models/todoModel";

class TodoService {
  constructor() {
    this.todos = [];
    this.endpoint = `${process.env.BASE_URL}/todoList`;
  }

  async getAlltodo() {
    const endpointUrl = this.endpoint;
    const { data } = await axios.get(endpointUrl);

    if (data) {
      this.todos = data.map((todo) => new TodoSchema(todo));
    }
  }

  async getTodoByEmail(email) {
    const endpointUrl = `${this.endpoint}?email=${email}`;
    const { data } = await axios.get(endpointUrl);

    if (data) {
      this.todos = data.map((todo) => new TodoSchema(todo));
    }
  }

  async addTodo(todo) {
    const endpointUrl = this.endpoint;
    const { data } = await axios.post(endpointUrl, todo);

    if (data) {
      this.todos.push(data);
    }

    return data;
  }

  async updateTodo(id, todoData) {
    const endpointUrl = `${this.endpoint}/${id}`;
    const { data } = await axios.patch(endpointUrl, todoData);
    return data;
  }

  async removeTodo(id) {
    const endpointUrl = `${this.endpoint}/${id}`;
    await axios.delete(endpointUrl);
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}

export default TodoService;
