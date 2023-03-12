import { handleFormTodo } from "../helper/handleForm";
import TodoItem from "./modules/todoList/TodoItem";

class TodoView {
  constructor() {}

  getValueInput(handle) {
    window.addEventListener("load", () => {
      const form = document.querySelector(".main-form");
      if (form) {
        handleFormTodo(form, handle);
      }
    });
  }

  displayTodos(todos, again = false) {
    const handleRender = () => {
      const todoListElm = document.querySelector(".todo-list");
      if (todos.length > 0) {
        const todoList = todos.map((todoItem) => TodoItem(todoItem));
        todoListElm.innerHTML = todoList.reverse();
      }
    };

    if (!again) {
      window.addEventListener("load", handleRender);
    } else {
      handleRender();
    }
  }

  deleteTodo() {}
}

export default new TodoView();
