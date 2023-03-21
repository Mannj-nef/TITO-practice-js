import MESSAGE from "../constants/message";
import { ACTION_FORM, KEY, PAGE } from "../constants/type";
import { handleCreateId } from "../helper/handleCreateId";
import {
  getLocalStorage,
  clearLocalStorage,
} from "../helper/handlelocalStorage";
import TOAST from "../helper/handleToast";

class TodoController {
  constructor(model, view, appView) {
    this.model = model;
    this.view = view;
    this.appView = appView;

    this.handleRenderTodo;
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

  handlesubmit = (todo, action) => {
    if (action === ACTION_FORM.ADD) {
      this.handleAddTodo(todo);
    } else if (action === ACTION_FORM.UPDATE) {
      this.handleUpdateTodo(todo);
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
        this.view.disableTodoView("add");
        const data = await TodoModel.addTodo(todoItem);

        if (data) {
          TodoModel.todos.push(todoItem);
          AppView.createToast(TOAST.SUCCESS(MESSAGE.ADD_TODO_SUCCESS));
          TodoView.displayTodos(TodoModel.todos);
          // get id of new todo when just  add
          this.renderNewTodoWhenChange();
        }
      }
    } catch (error) {
      AppView.createToast(TOAST.ERROR(error));
      TodoView.displayTodos(TodoModel.todos);
    }
  };

  handleUpdateTodo = async (todo) => {
    const TodoModel = this.model;
    const TodoView = this.view;
    const AppView = this.appView;
    const id = getLocalStorage(KEY.LOCALSTORAGE_ID_UPDATE);

    try {
      const data = await TodoModel.updateTodo(id, { title: todo });

      if (data) {
        TodoModel.todos.forEach((itemTodo) => {
          if (itemTodo.id === id) {
            itemTodo.title = todo;
          }
        });
        TodoView.resetFormTodoView();
        TodoView.displayTodos(TodoModel.todos);
        AppView.createToast(TOAST.SUCCESS(MESSAGE.UPDATE_TODO_SUCCESS));
        clearLocalStorage(KEY.LOCALSTORAGE_ID_UPDATE);

        this.renderNewTodoWhenChange();
      }
    } catch (error) {
      AppView.createToast(TOAST.ERROR(error));
      TodoView.displayTodos(TodoModel.todos);
    }
  };

  handleActiveWhenDone = async (id, status) => {
    const TodoModel = this.model;
    const TodoView = this.view;
    const AppView = this.appView;

    const clearDisable = true;

    try {
      const data = await TodoModel.updateTodo(id, { complete: status });

      if (data) {
        TodoView.disableTodoView(clearDisable);
      }
    } catch (error) {
      AppView.createToast(TOAST.ERROR(error));
      TodoView.disableTodoView(clearDisable);
    }
  };

  handleRemoveTodo = async (id) => {
    const TodoModel = this.model;
    const AppView = this.appView;
    const TodoView = this.view;

    const clearDisable = true;

    try {
      if (id) {
        const numberId = id;
        await TodoModel.removeTodo(numberId);

        const newTodo = TodoModel.todos.filter((todo) => todo.id !== id);

        if (newTodo) {
          TodoModel.todos = newTodo;

          const idTodoLocalStorege = getLocalStorage(
            KEY.LOCALSTORAGE_ID_UPDATE
          );

          if (id === idTodoLocalStorege) {
            TodoView.resetFormTodoView();
          }

          TodoView.displayTodos(TodoModel.todos);
          TodoView.disableTodoView(clearDisable);

          this.renderNewTodoWhenChange();

          AppView.createToast(TOAST.SUCCESS(MESSAGE.DELETE_TODO_SUCCESS));
        }
      }
    } catch (error) {
      AppView.createToast(TOAST.ERROR(error));
      TodoView.displayTodos(TodoModel.todos);
      TodoView.disableTodoView(clearDisable);
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
