import MESSAGE from "../constants/message";
import { KEY, PAGE } from "../constants/type";
import { handleCreateId } from "../helper/handleCreateId";
import { getLocalStorage } from "../helper/handlelocalStorage";
import TOAST from "../helper/handleToast";

class TodoController {
  constructor(model, view, appView) {
    this.model = model;
    this.view = view;
    this.appView = appView;

    this.view.domLoadTodoView(this.handleRenderTodo);
  }

  handleRenderTodo = async () => {
    const TodoView = this.view;
    TodoView.logOutView(this.handleLogout);

    await this.handleGetTodos();
    TodoView.getValueInput(this.handleAddTodo);
    TodoView.getIdDeleteTodo(this.handleRemoveTodo);
  };

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

    const index = window.location.search.indexOf("?");
    const userName = window.location.search.slice(index + 1);
    const TodoView = this.view;
    const user = getLocalStorage(KEY.LOCALSTORAGE_UESR);

    if (userName || user) {
      try {
        await TodoModel.getTodoByEmail(user.email);
        TodoView.displayTodos(TodoModel.todos);
      } catch (error) {
        console.log(error);
      }
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
        id: handleCreateId(),
        email,
        title: todo,
        complete: false,
      };

      if (todoItem) {
        TodoModel.todos.push(todoItem);
        TodoView.displayTodos(TodoModel.todos);

        await TodoModel.addTodo(todoItem);
        AppView.createToast(TOAST.SUCCESS(MESSAGE.ADD_TODO_SUCCESS));

        // get id of new todo when just  add
        TodoView.getIdDeleteTodo(this.handleRemoveTodo);
      }
    } catch (error) {
      AppView.createToast(TOAST.ERROR(error));
    }
  };

  handleRemoveTodo = async (id) => {
    const TodoModel = this.model;
    const AppView = this.appView;
    try {
      if (id) {
        const numberId = id;
        await TodoModel.removeTodo(numberId);
        AppView.createToast(TOAST.SUCCESS(MESSAGE.DELETE_TODO_SUCCESS));
      }
    } catch (error) {
      AppView.createToast(TOAST.ERROR(error));
    }
  };

  handleLogout = () => {
    const AppView = this.appView;
    AppView.showPage("todo-page", PAGE.LOGIN);
    window.location.search = "";
    AppView.createToast(TOAST.SUCCESS(MESSAGE.LOGOUT_SUCCESS));
  };
}
export default TodoController;
