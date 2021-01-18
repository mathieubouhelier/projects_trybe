const grupoestilo = ['newspaper', 'magazine1', 'magazine2'];
const grupotamanho = ['reallybig', 'big', 'medium'];
const gruporotação = ['rotateright', 'rotateleft'];
const grupoinclinação = ['skewright', 'skewleft'];
function aleatoire(qda) {
  return Math.floor(Math.random() * qda);
}
function classnameAleatoire() {
  return `${grupotamanho[aleatoire(3)]} ${grupoestilo[aleatoire(3)]} ${gruporotação[aleatoire(2)]} ${grupoinclinação[aleatoire(2)]}`;
}
// function to split the string and put it in span on button click
const buttonelement = document.getElementById('criar-carta');
buttonelement.addEventListener('click', function () {
  const cartaGeradElement = document.getElementById('carta-gerada');
  const textbox = document.getElementById('carta-texto').value;
  const textArray = textbox.split(' ');
  while (cartaGeradElement.firstChild) {
    cartaGeradElement.firstChild.remove();
  }
  for (let i = 0; i < textArray.length; i += 1) {
    const span = document.createElement('span');
    span.style.margin = '10px'; // Ver se e melhor colocar no css?
    span.className = classnameAleatoire();
    cartaGeradElement.appendChild(span).innerHTML = textArray[i];
  }
  const cartaContadorElemment = document.getElementById('carta-contador');
  cartaContadorElemment.innerText = textArray.length;
});
// //  function click on ball print a message
document.body.addEventListener('click', function (event) {
  const tagName = event.target.tagName;
  if (tagName === 'SPAN') {
    event.target.className = classnameAleatoire();
  }
});
