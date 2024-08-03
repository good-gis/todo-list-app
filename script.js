const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUl = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos')) || [];

init();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleAddTodo();
});

function init() {
    todos.forEach(addTodoToDOM);
}

function handleAddTodo() {
    const todoText = input.value.trim();

    if (todoText) {
        const newTodo = {
            text: todoText,
            completed: false
        };
        todos.push(newTodo);
        addTodoToDOM(newTodo);
        input.value = '';
        updateLocalStorage();
    }
}

function addTodoToDOM(todo) {
    const todoEl = document.createElement('li');
    todoEl.innerText = todo.text;
    if (todo.completed) {
        todoEl.classList.add('completed');
    }

    todoEl.addEventListener('click', () => {
        todo.completed = !todo.completed;
        todoEl.classList.toggle('completed');
        updateLocalStorage();
    });

    todoEl.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        todosUl.removeChild(todoEl);
        todos.splice(todos.indexOf(todo), 1);
        updateLocalStorage();
    });

    todosUl.appendChild(todoEl);
}

function updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
