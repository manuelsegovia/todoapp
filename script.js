const site = 'https://segovia-list-todo.herokuapp.com/todos/';

const todoList = document.getElementById('in-progress-list');
const doneList = document.getElementById('done');

const todoForm = document.getElementById('todo-form');
const todoText = document.getElementById('todo-text');
const buttonSave = document.getElementById('todo-submit');

const formatedDate = mSeconds => {
  const fullDate = new Date(mSeconds);
  const year = fullDate.getFullYear();
  const month = fullDate.getMonth();
  const day = fullDate.getDay();
  const hour = fullDate.getHours();
  let minutes = fullDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${year}/${month}/${day} @ ${hour}:${minutes} `;
};
const insertList = items => {
  console.log(items);
  items.forEach(item => {
    const todo = document.createElement('li');
    if (item.completed === false) {
      todo.innerHTML = `<div>${item.text}</div>`;
      todoList.appendChild(todo);
    } else {
      const completedDate = formatedDate(item.completedAt);
      // const year = completedDate.getFullYear();
      // const day = completedDate.console.log(year);
      todo.innerHTML = `<div>${item.text}<span>${completedDate}</span></div>`;
      doneList.appendChild(todo);
    }
  });
};
const savePost = content =>
  axios
    .post(`${site}`, {
      text: content,
    })
    .then(response => console.log(response));

const getTodos = async url => {
  const res = await axios.get(url);
  const { todos } = res.data;

  insertList(todos);
};

getTodos(`${site}`);

// Event Listeners
todoForm.addEventListener('submit', e => {
  e.preventDefault();
});
buttonSave.addEventListener('click', () => {
  const content = todoText.value;
  console.log(content);
  savePost(content);
  getTodos(site);
});

// const getTodos = () =>
//   fetch(`${cors}${site}`)
//     .then(response => response.json())
//     .then(data => data.todos.forEach(element => console.log(element)));

// getTodos();

// const getTodos = async url => {
//   const res = await fetch(url);
//   const data = await res.json();
//   // console.log(data.todos[0]._id);
//   insertList(data.todos);
// };
