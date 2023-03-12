import { KEY } from "../constants/type";
import { getLocalStorage } from "../helper/handlelocalStorage";
import TOAST from "../helper/handleToast";

class TodoController {
  constructor(model, view, appView) {
    this.model = model;
    this.view = view;
    this.appView = appView;

    this.handleGetTodos();
    this.view.getValueInput(this.handleAddTodo);
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

    if (!user) return;
    try {
      await TodoModel.getTodoByEmail(user.email);
      TodoView.displayTodos(TodoModel.todos);
    } catch (error) {
      console.log(error);
    }
  };

  handleAddTodo = async (todo) => {
    const TodoModel = this.model;
    const TodoView = this.view;
    const AppView = this.appView;
    const user = getLocalStorage(KEY.LOCALSTORAGE_UESR);
    const email = user.email;

    try {
      const todoItem = {
        email,
        title: todo,
        complete: false,
      };

      if (todoItem) {
        const againRender = true;

        TodoModel.todos.push(todoItem);
        TodoView.displayTodos(TodoModel.todos, againRender);

        await TodoModel.addTodo(todoItem);
        AppView.createToast(TOAST.SUCCESS("add thanh cong"));
      }
    } catch (error) {
      AppView.createToast(TOAST.ERROR(error));
    }
  };
}
export default TodoController;
