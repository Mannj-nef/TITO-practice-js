function TodoForm() {
  return `
    <form class="main-form" autocomplete="off">
        <input
            class="main-input"
            name="input-todo"
            type="text"
            placeholder="Add your new todo..."
        />
        <button type="submit" class="main-btn">
          <div class="loading d-none"></div>
          <span>Add</span>
        </button>
    </form>
  `;
}

export default TodoForm;
