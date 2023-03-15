import { ACTION_FORM, KEY } from "../constants/type";
import { handleFormTodo } from "../helper/handleForm";
import {
  clearLocalStorage,
  setLocalStorage,
} from "../helper/handlelocalStorage";
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
      todoListElm.innerHTML = todoList.reverse().join("");
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
        e.stopPropagation();

        const target = e.target;
        const id = target.dataset.id;
        const todoItem = target.parentNode.parentNode;
        const todoItemParent = todoItem.parentNode;

        const todoConfirmCurrent = document.querySelector(
          ".todo-confirm-delete"
        );

        if (todoConfirmCurrent) {
          const confirmParrent = todoConfirmCurrent.parentNode;
          confirmParrent.removeChild(todoConfirmCurrent);
        }

        //  create todoConfirm
        const TodoConfirm = TodoConfirmDelete();
        btnItem.insertAdjacentHTML("afterend", TodoConfirm);
        const todoConfirm = document.querySelector(".todo-confirm-delete");

        if (!id) return;
        this.confirmDelete(id, todoConfirm, todoItem, todoItemParent, handle);
      });
    });
  }

  activeTodoWhenDone(handle) {
    const todos = document.querySelectorAll(".todo-item");
    [...todos].forEach((todo) => {
      todo.addEventListener("click", (e) => {
        const target = e.target;
        const id = target.dataset.id_todo;
        const classChecked = "checkbox-input-checked";

        const checkBoxElm = target.querySelector(".checkbox-input");
        checkBoxElm.classList.toggle(classChecked);
        const status = checkBoxElm.classList.contains(classChecked);

        if (typeof handle === "function") {
          handle(id, status);
        }
      });
    });
  }

  getValueUpdateTodoView() {
    const todoList = document.querySelector(".todo-list");

    if (!todoList) return;
    const todoItemBtnUpdate = todoList.querySelectorAll(".btn-update");
    [...todoItemBtnUpdate].forEach((btnUpdate) => {
      btnUpdate.addEventListener("click", (e) => {
        e.stopPropagation();
        const target = e.target;
        const id = target.dataset.id;
        const todoItem = target.parentNode.parentNode;

        if (!todoItem.classList.contains("todo-item")) return;

        const todoLable = todoItem.querySelector(".checkbox-label");
        const todoValue = todoLable.textContent;

        setLocalStorage(KEY.LOCALSTORAGE_ID_UPDATE, id);

        handleForm(todoValue);
      });
    });

    function handleForm(todoValue) {
      const form = document.querySelector(".main-form");

      if (!form) return;
      const inputTodo = form.querySelector(".main-input");

      inputTodo.focus();
      inputTodo.value = todoValue.trim();

      const btnRemoveValue = form.querySelector(".btn-remove-form");
      btnRemoveValue.classList.add("main-update");

      const actionTodo = form.querySelector(".action-todo");
      actionTodo.textContent = ACTION_FORM.UPDATE;

      btnRemoveValue.addEventListener("click", (e) => {
        e.stopPropagation();
        inputTodo.value = "";
        actionTodo.textContent = ACTION_FORM.ADD;
        btnRemoveValue.classList.remove("main-update");
      });
    }
  }

  resetFormTodoView() {
    const form = document.querySelector(".main-form");
    if (!form) return;
    const btnRemoveValue = form.querySelector(".btn-remove-form");
    const actionTodo = form.querySelector(".action-todo");

    btnRemoveValue.classList.remove("main-update");
    actionTodo.textContent = ACTION_FORM.ADD;
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
