import { ACTION_FORM, KEY, PAGE } from "../constants/type";
import { handleCreateId } from "../helper/createId";
import { getLocalStorage, clearLocalStorage } from "../helper/localStorage";

class TodoController {
  constructor(service, view, appView) {
    this.service = service;
    this.view = view;
    this.appView = appView;
  }

  handleRenderTodo = async () => {
    const TodoView = this.view;
    TodoView.logOutView(this.handleLogout);

    await this.handleGetTodos();

    TodoView.getValueUpdateTodoView();
    TodoView.getValueInput(this.handlesubmit);
    TodoView.getIdDeleteTodo(this.handleRemoveTodo);
    TodoView.activeTodoWhenDone(this.handleActiveWhenDone);
  };

  renderNewTodoWhenChange() {
    const TodoView = this.view;

    TodoView.getValueUpdateTodoView();
    TodoView.getIdDeleteTodo(this.handleRemoveTodo);
    TodoView.activeTodoWhenDone(this.handleActiveWhenDone);
  }

  handleGetTodos = async () => {
    const TodoService = this.service;

    const TodoView = this.view;
    const user = getLocalStorage(KEY.LOCALSTORAGE_UESR);

    if (user) {
      await TodoService.getTodoByEmail(user.email);
    }
    TodoView.displayTodos(TodoService.todos);
  };

  handlesubmit = (todo, action) => {
    if (action === ACTION_FORM.ADD) {
      this.handleAddTodo(todo);
    } else if (action === ACTION_FORM.UPDATE) {
      this.handleUpdateTodo(todo);
    }
  };

  handleAddTodo = async (todo) => {
    const TodoService = this.service;
    const TodoView = this.view;

    const { email } = getLocalStorage(KEY.LOCALSTORAGE_UESR);

    const todoItem = {
      id: handleCreateId(),
      email,
      title: todo,
      complete: false,
    };

    this.view.disableTodoView("add");
    const data = await TodoService.addTodo(todoItem);

    if (data) {
      // get id of new todo when just  add
      TodoView.displayTodos(TodoService.todos);
    }
    this.renderNewTodoWhenChange();
  };

  handleUpdateTodo = async (todo) => {
    const TodoService = this.service;
    const TodoView = this.view;
    const id = getLocalStorage(KEY.LOCALSTORAGE_ID_UPDATE);

    this.view.disableTodoView("update");

    const data = await TodoService.updateTodo(id, { title: todo });

    if (data) {
      TodoService.todos.forEach((itemTodo) => {
        if (itemTodo.id === id) {
          itemTodo.title = todo;
        }
      });
      TodoView.resetFormTodoView();
      clearLocalStorage(KEY.LOCALSTORAGE_ID_UPDATE);
      // get id of new todo when just  add
      TodoView.displayTodos(TodoService.todos);
    }
    this.renderNewTodoWhenChange();
  };

  handleActiveWhenDone = async (id, status) => {
    const TodoService = this.service;
    const TodoView = this.view;

    const clearDisable = true;

    await TodoService.updateTodo(id, { complete: status });

    TodoView.disableTodoView(clearDisable);
  };

  handleRemoveTodo = async (id) => {
    const TodoService = this.service;
    const TodoView = this.view;

    const clearDisable = true;

    if (id) {
      const numberId = id;
      await TodoService.removeTodo(numberId);

      const idTodoLocalStorege = getLocalStorage(KEY.LOCALSTORAGE_ID_UPDATE);

      if (id === idTodoLocalStorege) {
        TodoView.resetFormTodoView();
      }
    }
    TodoView.displayTodos(TodoService.todos);
    TodoView.disableTodoView(clearDisable);
    this.renderNewTodoWhenChange();
  };

  handleLogout = () => {
    const AppView = this.appView;
    const TodoService = this.service;

    window.location.search = "";
    AppView.showPage("todo-page", PAGE.LOGIN);
    TodoService.logoutSuccess();
  };
}
export default TodoController;
