const TODO_LIST_KEY = "todoList";

const input = document.querySelector(".input");
const button = document.querySelector(".button");
const list = document.querySelector(".list");

const getTodoList = () => {
  const stored = localStorage.getItem(TODO_LIST_KEY);
  return stored ? JSON.parse(stored) : [];
};

const setTodoList = (todoArray) => {
  localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoArray));
};

const addTodo = () => {
  const value = input.value.trim();
  if (!value) return;

  const currentTodos = getTodoList();
  console.log(value);
  currentTodos.push(value);
  setTodoList(currentTodos);

  input.value = "";
  renderTodoList();
};

const removeTodo = (todoToRemove) => {
  const currentTodos = getTodoList();
  const updatedTodos = currentTodos.filter((todo) => todo !== todoToRemove);
  setTodoList(updatedTodos);
};

const renderTodoList = () => {
  list.innerHTML = "";

  const todoList = getTodoList();

  todoList.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo;

    const removeButton = document.createElement("button");
    removeButton.textContent = "삭제";
    removeButton.addEventListener("click", () => {
      removeTodo(todo);
      renderTodoList();
    });

    li.appendChild(removeButton);
    list.appendChild(li);
  });
};

button.addEventListener("click", addTodo);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

renderTodoList();
