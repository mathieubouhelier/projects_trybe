window.onload = function () {
};//  end of window.onload
let scorevalue = 0;
const scoreElement = document.getElementById('score');
scoreElement.innerHTML = `Seu score é: ${scorevalue}`;
const balls = document.querySelectorAll('.ball');
const rgbColorElement = document.querySelector('#rgb-color');
// return random number between 1 and 255
function aleatoire() {
  return Math.floor(Math.random() * 255);
}
// return a random color format rgb
function randomcolor() {
  return `(${aleatoire()}, ${aleatoire()}, ${aleatoire()})`;
}
//  function all ball get a random color and set one of the color to h2 in a text form
function ballsGetRandomColor() {
  const randomBall = Math.floor(Math.random() * 5);
  for (let i = 0; i < balls.length; i += 1) {
    const tempColor = randomcolor();
    balls[i].style.backgroundColor = `rgb${tempColor}`;
    if (randomBall === i) {
      rgbColorElement.innerHTML = tempColor;
    }
  }
}
//  function on click RESET button, active ballsGetRandomColor()
const resetGameElement = document.querySelector('#reset-game');
resetGameElement.addEventListener('click', function () {  
  ballsGetRandomColor();
  document.querySelector('#answer').innerHTML = 'Escolha uma cor';
});
ballsGetRandomColor();
//  function click on ball print a message
document.body.addEventListener('click', function (event) {
  const classname = event.target.className;
  const targetbackground = event.target.style.backgroundColor;
  if (targetbackground === `rgb${rgbColorElement.innerHTML}` && classname.includes('ball')) {
    document.querySelector('#answer').innerHTML = 'Acertou!';
    scorevalue += 3;
    scoreElement.innerHTML = `Seu score é: ${scorevalue}`;
  } else if (targetbackground !== `rgb${rgbColorElement.innerHTML}` && classname.includes('ball')) {
    document.querySelector('#answer').innerHTML = 'Errou! Tente novamente!';
  }
});
