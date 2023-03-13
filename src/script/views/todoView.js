import { handleFormTodo } from "../helper/handleForm";
import TodoConfirmDelete from "./modules/todoList/TodoConfirmDelete";
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

  confirmDelete(id, btnTodoConfirm, todoItem, todoItemParent, handle) {
    const btnRemove = document.querySelector(".btn-confirm-remove");
    const btnCancel = document.querySelector(".btn-confirm-remove-cancel");

    btnRemove.addEventListener("click", (e) => {
      e.stopPropagation();
      if (typeof handle === "function") {
        handle(id);
        RemoveConfirm();
        todoItemParent.removeChild(todoItem);
      }
    });

    btnCancel.addEventListener("click", (e) => {
      e.stopPropagation();
      RemoveConfirm();
    });

    function RemoveConfirm() {
      const confirmParent = btnTodoConfirm.parentNode;
      confirmParent.removeChild(btnTodoConfirm);
    }
  }

  getIdDeleteTodo(handle, again = false) {
    const handleGetIdInput = () => {
      const todoList = document.querySelector(".todo-list");
      if (!todoList) return;

      const todoItemsBtnRemove = todoList.querySelectorAll(".btn-remove");

      [...todoItemsBtnRemove].forEach((btnItem) => {
        btnItem.addEventListener("click", (e) => {
          const target = e.target;
          const id = target.dataset.id;
          const todoItem = target.parentNode.parentNode;
          const todoItemParent = todoItem.parentNode;

          console.log(target);

          //  create todoConfirm
          const todoConfirm = TodoConfirmDelete();
          btnItem.insertAdjacentHTML("afterend", todoConfirm);
          const TodoConfirm = document.querySelector(".todo-confirm-delete");

          if (!id) return;
          this.confirmDelete(id, TodoConfirm, todoItem, todoItemParent, handle);
        });
      });
    };

    if (!again) {
      window.addEventListener("load", handleGetIdInput);
    } else {
      handleGetIdInput();
    }
  }
}

export default new TodoView();
