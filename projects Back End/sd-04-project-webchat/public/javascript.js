const form = document.querySelector('form');
const input = document.getElementById('messageInput');
const nicknameInput = document.getElementById('nicknameInput');
const loggedUserList = document.getElementById('loggedUserList');
const messagesList = document.getElementById('messagesList');
const nicknameValue = document.getElementById('nicknameValue');
let nickname = '';

// Start socket.io connection
const socket = window.io();

// Triggered on load: set a default nickname, call all stored messages
function onLoadActions() {
  socket.on('connect', () => {
    nicknameValue.innerHTML = socket.id;
    nickname = socket.id;
    socket.emit('send all messages');
  });
}

// Update the nickname after click and clean the input
function getNickname() {
  nickname = nicknameInput.value;
  nicknameValue.innerHTML = nickname;
  nicknameInput.value = '';
  socket.emit('nicknameChange', {
    socketId: socket.id,
    nickname,
  });
}
document
  .getElementById('nicknameButton')
  .addEventListener('click', getNickname, false);

// Send message after click and clean the input
function sendMessage(e) {
  e.preventDefault(); // prevent when the page is reloaded
  // send input value to server as type 'message'
  socket.emit('message', {
    chatMessage: input.value,
    nickname,
  });
  input.value = '';
}
// Click on button send the message via submit
form.addEventListener('submit', sendMessage);
// Feed the lu with all users (loggedUserList)
function updateLoggedUsersList(loggedUsers) {
  loggedUserList.innerHTML = '';

  Object.keys(loggedUsers).map((key) => {
    const li = document.createElement('li');
    li.innerText = loggedUsers[key];
    li.setAttribute('data-testid', 'online-user');
    li.classList.add('list-group-item');
    li.classList.add('list-group-item-light');
    loggedUserList.appendChild(li);
    return li;
  });
}
// add the received message to the list
function addMessageToHTML(message) {
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  li.classList.add('list-group-item');
  li.classList.add('list-group-item-light');
  messagesList.appendChild(li);
}
// add all stored received message to the list

function updateAllMessages(message) {
  messagesList.innerHTML = '';
  for (let index = 0; index < message.length; index += 1) {
    const li = document.createElement('li');
    li.setAttribute('data-testid', 'message');
    const time = message[index].created_on;
    li.innerText = `${time} - ${message[index].nickname}: ${message[index].chatMessage}`;
    li.classList.add('list-group-item');
    li.classList.add('list-group-item-light');
    messagesList.appendChild(li);
  }
}
// communication with the server
socket.on('message', addMessageToHTML);
socket.on('loggedUsers', updateLoggedUsersList);
socket.on('allMessages', updateAllMessages);

window.onload = onLoadActions;
