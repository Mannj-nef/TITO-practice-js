import { KEY } from "../constants/type";
import { handleFormTodo } from "../helper/handleForm";
import { clearLocalStorage } from "../helper/handlelocalStorage";
import TodoConfirmDelete from "./modules/todoList/TodoConfirmDelete";
import TodoItem from "./modules/todoList/TodoItem";

class TodoView {
  constructor() {}

  domLoadTodoView(handle) {
    window.addEventListener("load", () => {
      const todoPage = document.querySelector(".todo-page");
      if (todoPage && typeof handle === "function") {
        handle();
      }
    });
  }

  getValueInput(handle) {
    const form = document.querySelector(".main-form");
    if (form) {
      handleFormTodo(form, handle);
    }
  }

  displayTodos(todos) {
    const todoListElm = document.querySelector(".todo-list");
    if (todos.length > 0) {
      const todoList = todos.map((todoItem) => TodoItem(todoItem));
      todoListElm.innerHTML = todoList.reverse();
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

  getIdDeleteTodo(handle) {
    const todoList = document.querySelector(".todo-list");
    if (!todoList) return;

    const todoItemsBtnRemove = todoList.querySelectorAll(".btn-remove");

    [...todoItemsBtnRemove].forEach((btnItem) => {
      btnItem.addEventListener("click", (e) => {
        const target = e.target;
        const id = target.dataset.id;
        const todoItem = target.parentNode.parentNode;
        const todoItemParent = todoItem.parentNode;

        //  create todoConfirm
        const todoConfirm = TodoConfirmDelete();
        btnItem.insertAdjacentHTML("afterend", todoConfirm);
        const TodoConfirm = document.querySelector(".todo-confirm-delete");

        if (!id) return;
        this.confirmDelete(id, TodoConfirm, todoItem, todoItemParent, handle);
      });
    });
  }

  logOutView(handle) {
    const btnLogout = document.querySelector(".header-logout");

    btnLogout.addEventListener("click", () => {
      clearLocalStorage(KEY.LOCALSTORAGE_UESR);

      if (typeof handle === "function") {
        handle();
      }
    });
  }
}

export default new TodoView();
