import { handleFormTodo } from "../helper/handleForm";

class TodoView {
  constructor() {
    this.getValueInput;
  }

  getValueInput(handle) {
    window.addEventListener("load", () => {
      const form = document.querySelector(".main-form");
      if (form) {
        handleFormTodo(form, handle);
      }
    });
  }
  displayTodos(todos) {}
}

export default new TodoView();
