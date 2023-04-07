import MESSAGE from "../constants/message";
import { ACTION_FORM, KEY, PAGE } from "../constants/type";
import { handleCreateId } from "../helper/createId";
import { getLocalStorage, clearLocalStorage } from "../helper/localStorage";
import TOAST from "../helper/toast";

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

  handleGetTodoAllTodo = async () => {
    const TodoService = this.service;
    const AppView = this.appView;

    try {
      await TodoService.getAlltodo();
    } catch (error) {
      AppView.createToast(TOAST.ERROR(error));
    }
  };

  handleGetTodos = async () => {
    const TodoService = this.service;
    const AppView = this.appView;

    const TodoView = this.view;
    const user = getLocalStorage(KEY.LOCALSTORAGE_UESR);

    if (user) {
      try {
        await TodoService.getTodoByEmail(user.email);
        TodoView.displayTodos(TodoService.todos);
      } catch (error) {
        AppView.createToast(TOAST.ERROR(error));
      }
    }
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
    const AppView = this.appView;

    const { user: email } = getLocalStorage(KEY.LOCALSTORAGE_UESR);

    try {
      const todoItem = {
        id: handleCreateId(),
        email,
        title: todo,
        complete: false,
      };

      this.view.disableTodoView("add");
      const data = await TodoService.addTodo(todoItem);

      if (data) {
        AppView.createToast(TOAST.SUCCESS(MESSAGE.ADD_TODO_SUCCESS));
        TodoView.displayTodos(TodoService.todos);
        // get id of new todo when just  add
        this.renderNewTodoWhenChange();
      }
    } catch (error) {
      AppView.createToast(TOAST.ERROR(error));
      TodoView.displayTodos(TodoService.todos);
    }
  };

  handleUpdateTodo = async (todo) => {
    const TodoService = this.service;
    const TodoView = this.view;
    const AppView = this.appView;
    const id = getLocalStorage(KEY.LOCALSTORAGE_ID_UPDATE);

    try {
      this.view.disableTodoView("update");

      const data = await TodoService.updateTodo(id, { title: todo });

      if (data) {
        TodoService.todos.forEach((itemTodo) => {
          if (itemTodo.id === id) {
            itemTodo.title = todo;
          }
        });
        TodoView.resetFormTodoView();
        AppView.createToast(TOAST.SUCCESS(MESSAGE.UPDATE_TODO_SUCCESS));
        TodoView.displayTodos(TodoService.todos);

        clearLocalStorage(KEY.LOCALSTORAGE_ID_UPDATE);
        // get id of new todo when just  add
        this.renderNewTodoWhenChange();
      }
    } catch (error) {
      AppView.createToast(TOAST.ERROR(error));
      TodoView.displayTodos(TodoService.todos);
    }
  };

  handleActiveWhenDone = async (id, status) => {
    const TodoService = this.service;
    const TodoView = this.view;
    const AppView = this.appView;

    const clearDisable = true;

    try {
      const data = await TodoService.updateTodo(id, { complete: status });

      if (data) {
        TodoView.disableTodoView(clearDisable);
      }
    } catch (error) {
      AppView.createToast(TOAST.ERROR(error));
      TodoView.disableTodoView(clearDisable);
    }
  };

  handleRemoveTodo = async (id) => {
    const TodoService = this.service;
    const AppView = this.appView;
    const TodoView = this.view;

    const clearDisable = true;

    try {
      if (id) {
        const numberId = id;
        await TodoService.removeTodo(numberId);

        const idTodoLocalStorege = getLocalStorage(KEY.LOCALSTORAGE_ID_UPDATE);

        if (id === idTodoLocalStorege) {
          TodoView.resetFormTodoView();
        }

        TodoView.displayTodos(TodoService.todos);
        TodoView.disableTodoView(clearDisable);

        this.renderNewTodoWhenChange();

        AppView.createToast(TOAST.SUCCESS(MESSAGE.DELETE_TODO_SUCCESS));
      }
    } catch (error) {
      AppView.createToast(TOAST.ERROR(error));
      TodoView.displayTodos(TodoService.todos);
      TodoView.disableTodoView(clearDisable);
    }
  };

  handleLogout = () => {
    const AppView = this.appView;
    AppView.showPage("todo-page", PAGE.LOGIN);
    AppView.createToast(TOAST.SUCCESS(MESSAGE.LOGOUT_SUCCESS));
  };
}
export default TodoController;
