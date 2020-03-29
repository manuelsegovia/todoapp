const site = 'https://segovia-list-todo.herokuapp.com/todos/';

const todoList = document.getElementById('in-progress-list');
const doneList = document.getElementById('done');

const todoForm = document.getElementById('todo-form');
const todoText = document.getElementById('todo-text');
const buttonSave = document.getElementById('todo-submit');

const formatedDate = mSeconds => moment(mSeconds).format('YYYY:MM:DD @ HH:mm');

// to add items to both lists
const insertList = items => {
  items.forEach(item => {
    const todo = document.createElement('li');
    todo.setAttribute('data-id', `"${item._id}"`);
    if (item.completed === false) {
      todo.innerHTML = `<div>${item.text}<span><button class="finish-btn"><i class="fas fa-check"></i></button></span></div>`;

      todoList.appendChild(todo);
    } else {
      const completedDate = formatedDate(item.completedAt);
      todo.innerHTML = `<div>${item.text}<span>${completedDate}</span><span><button class="trash-btn"><i class="fas fa-trash-alt"></i></button></span></div>`;
      doneList.appendChild(todo);
    }
  });
};

// API GET
const getTodos = async url => {
  // making sure there no items in DOM list
  doneList.innerHTML = '';
  todoList.innerHTML = '';
  const res = await axios.get(url);
  const { todos } = res.data;
  const sortedTodos = await todos.sort((a, b) =>
    a.completedAt > b.completedAt ? -1 : 1
  );
  insertList(sortedTodos);
};
// API POST
const savePost = async content => {
  try {
    await axios.post(`${site}`, {
      text: content,
    });
    await getTodos(site);
  } catch (error) {
    console.log(error);
  }
};
// API PATCH
const changeToDone = async elemId => {
  try {
    await axios.patch(`${site}${elemId}`, {
      completed: true,
    });
    await getTodos(site);
  } catch (error) {
    console.log(console.error);
  }
};
// API DELETE
const deleteToDo = async elemID => {
  try {
    const response = await axios.delete(`${site}${elemID}`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

// to start page loading
getTodos(site);

// Event Listeners
todoForm.addEventListener('submit', e => {
  e.preventDefault();
});
buttonSave.addEventListener('click', () => {
  savePost(todoText.value);
  todoText.value = '';
});

todoList.addEventListener('click', e => {
  const elem = e.target.closest('.finish-btn');
  if (elem) {
    const elementId = elem.parentElement.parentElement.parentElement.getAttribute(
      'data-id'
    );
    changeToDone(elementId.substr(1).slice(0, -1));
  }
});

doneList.addEventListener('click', e => {
  const elem = e.target.closest('.trash-btn');
  if (elem) {
    const elementId = elem.parentElement.parentElement.parentElement.getAttribute(
      'data-id'
    );
    deleteToDo(elementId.substr(1).slice(0, -1));
    getTodos(site);
  }
});
