window.onload = function () {
  // const taskBox = document.querySelector('#texto-tarefa');
  // const buttonevent = document.querySelector('#criar-tarefa');
  // const list = document.querySelector('#lista-tarefas');
  //  function to modify items of the list: put rgb(128,128,128)
  document.body.addEventListener('click', function (event) {
    const classname = event.target.className;
    if (classname.includes('list')) {
      const listItem = document.querySelectorAll('.list');
      for (let i = 0; i < listItem.length; i += 1) {
        if (listItem[i].className.includes('selected')) {
          listItem[i].classList.remove('selected');
        }
      }
      event.target.classList.add('selected');
    }
  });
//  end window.onload
};
  //  function remove selected task
const taskBox = document.querySelector('#texto-tarefa');
const buttonevent = document.querySelector('#criar-tarefa');
const list = document.querySelector('#lista-tarefas');
const buttondeleteselected = document.querySelector('#remover-selecionado');
buttondeleteselected.addEventListener('click', function () {
  const listItem = document.querySelectorAll('.list');
  for (let i = 0; i < listItem.length; i += 1) {
    const classname = listItem[i].className;
    if (classname.includes('selected')) {
      list.removeChild(listItem[i]);
    }
  }
});
  //  function remove completed task
const buttondeletefinished = document.querySelector('#remover-finalizados');
buttondeletefinished.addEventListener('click', function () {
  const listItem = document.querySelectorAll('.list');
  for (let i = 0; i < listItem.length; i += 1) {
    const classname = listItem[i].className;
    if (classname.includes('completed')) {
      list.removeChild(listItem[i]);
    }
  }
});
  // function on click button delete all items of the list
const buttondeletevent = document.querySelector('#apaga-tudo');
buttondeletevent.addEventListener('click', function () {
  const listItem = document.querySelectorAll('.list');
  for (let i = 0; i < listItem.length; i += 1) {
    list.removeChild(listItem[i]);
  }
});
  //  function on double click add and remove '.completed'
  // PARA MELHORAR
document.body.addEventListener('dblclick', function () {
  const classname = event.target.className;
  if (classname.includes('list')) {
    if (classname.includes('completed')) event.target.classList.remove('completed');
    else {
      event.target.classList.add('completed');
    }
  }
});
  //  function on click button create a new item to list
buttonevent.addEventListener('click', function () {
  const taskText = taskBox.value;
  const li = document.createElement('li');
  li.classList.add('list');
  list.appendChild(li).innerHTML = taskText;
  taskBox.value = '';
});

  //  function on click button up item go up to list
const buttonup = document.querySelector('#mover-cima');
buttonup.addEventListener('click', function () {
  const liselected = document.querySelector('.selected');
  const previous = liselected.previousElementSibling;
  list.insertBefore(liselected, previous);
});
  //  function on click button down item go down to list
const buttondown = document.querySelector('#mover-baixo');
buttondown.addEventListener('click', function () {
  const liselected = document.querySelector('.selected');
  let next = liselected.nextElementSibling;
  if (next != null) next = liselected.nextElementSibling.nextElementSibling;
  list.insertBefore(liselected, next);
});
    //  function load the list when broswer load the page
const listItem2 = localStorage.getItem('taskQuantity');
for (let i = 0; i < listItem2; i += 1) {
  const taskNumberText = localStorage.getItem(`task ${i}`);
  const taskNumberClass = localStorage.getItem(`class ${i}`);
  const li = document.createElement('li');
  const taskNumberClassArray = taskNumberClass.split(' ');
  for (let j = 0; j < taskNumberClassArray.length; j += 1) {
    li.classList.add(taskNumberClassArray[j]);
  }
  list.appendChild(li).innerHTML = taskNumberText;
    //  taskBox.value = "";
}
  //  function save the list
const buttonsave = document.querySelector('#salvar-tarefas');
buttonsave.addEventListener('click', function () {
  localStorage.clear();
  const listItem = document.querySelectorAll('.list');
  localStorage.setItem('taskQuantity', listItem.length);
  for (let i = 0; i < listItem.length; i += 1) {
    const classname = listItem[i].className;
    const textOfTask = listItem[i].innerHTML;
    const taskNumberText = `task ${i}`;
    const taskNumberClass = `class ${i}`;
    localStorage.setItem(taskNumberText, textOfTask);
    localStorage.setItem(taskNumberClass, classname);
  }
});
