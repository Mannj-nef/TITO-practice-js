import { handleFormTodo } from "../helper/handleForm";
import TodoItem from "./modules/todoList/TodoItem";

class TodoView {
  constructor() {
    this.getValueInput;
  }

  getValueInput(handle) {
    window.addEventListener("load", () => {
      const form = document.querySelector(".main-form");
      if (form) {
        handleFormTodo(form);
      }
    });
  }

  displayTodos(todos) {
    window.addEventListener("load", () => {
      const todoListElm = document.querySelector(".todo-list");

      if (todos.length > 0) {
        const todoList = todos.map((todoItem) => TodoItem(todoItem));
        todoListElm.innerHTML = todoList;
      }
    });
  }

  deleteTodo() {}
}

export default new TodoView();
