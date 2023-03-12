import { KEY } from "../constants/type";
import { getLocalStorage } from "../helper/handlelocalStorage";

class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.handleGetTodos();
  }

  handleGetTodoAllTodos = async () => {
    const TodoModel = this.model;
    try {
      await TodoModel.getAlltodo();
    } catch (error) {
      console.log(error);
    }
  };

  handleGetTodos = async () => {
    const TodoModel = this.model;
    const TodoView = this.view;
    const user = getLocalStorage(KEY.LOCALSTORAGE_UESR);

    try {
      await TodoModel.getTodoByEmail(user.email);
      TodoView.displayTodos(TodoModel.todos);
    } catch (error) {
      console.log(error);
    }
  };
}
export default TodoController;
