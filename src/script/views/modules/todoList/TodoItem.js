function TodoItem({ titleTask = "Please check me if done task" }) {
  return `
    <div class="todo-item">
        <label for="checkbox" class="checkbox-style">
        <input
            type="checkbox"
            name="evondev"
            id="checkbox"
            class="checkbox-input"
        />
        <div class="checkbox-box">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            >
            <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
            />
            </svg>
        </div>
        <label for="checkbox" class="checkbox-label"
            >${titleTask}</label
        >
        </label>

        <div class="todo-btn-wrapp">
        <button class="btn todo-btn btn-replace">
            <i class="ti-pencil"></i>
        </button>
        <button class="btn todo-btn btn-remove">
            <i class="ti-trash"></i>
        </button>
        </div>
    </div>
    `;
}

export default TodoItem;
