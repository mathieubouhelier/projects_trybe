window.onload = function() {
function aleatoire (num){
	num = Math.round(Math.random()*255);
	return num;
}
let colorSelector = document.querySelectorAll('.color');
for (let i = 1; i<4; i += 1){
	let color1 = 'rgb('+ aleatoire() + ',' + aleatoire() + ','+ aleatoire() +')';
	colorSelector[i].style.backgroundColor = color1;
}
let colors = document.querySelectorAll('.color');
for (let i = 0; i < colors.length; i += 1){
colors[i].addEventListener ('click',function(event){
	let colorsValue = event.target.style.backgroundColor;
	let colorsClassValue = colors[i].className;
	// loop to remove class .selected to all
	for (let i=0; i<colors.length; i+=1){
			colors[i].classList.remove('selected');
	}
	colors[i].classList.add('selected');//add the class selected to the clicked
})
}
} // END window.onload = function()
//Loop to creat the square board pixel
const pixelBoard = document.querySelector('#pixel-board');
const generateBoard = document.querySelector('#generate-board');
let n = 0;
function myFunction() {
	n = document.querySelector('#board-size').value;
	if (n < 5) n = 5;
	if (n > 50) n = 50;
	document.getElementById('pixel-board').innerHTML = "";
	for (i = 0; i < n; i += 1){
		const divlineElement = document.createElement('div');
		divlineElement.className = "line";
		pixelBoard.appendChild(divlineElement);
		for (j = 0; j < n; j += 1){
			const divLine = document.querySelectorAll('.line');
			const divPixelElement = document.createElement('div');
                divPixelElement.className = 'pixel';
                divPixelElement.style.backgroundColor = 'white';
                divLine[i].appendChild(divPixelElement);
			}
        }
 pixels = document.querySelectorAll('.pixel'); 
}
//loop to clear all pixels
let clearboard = document.querySelector('#clear-board'); 
var pixels = document.querySelectorAll('.pixel'); 
clearboard.addEventListener('click',function(event){
	console.log('click');
	for (let i = 0; i < pixels.length; i += 1){
	pixels[i].style.backgroundColor = 'white';
	console.log('pixel');
	}
})
//loop to add color to clicked pixel
	document.body.addEventListener('click', function (event) {
		const classname = event.target.className;
		if (classname.includes('pixel')) {
			let selectedcolor = document.querySelector('.selected');
			let colorsValueClassSelected = selectedcolor.style.backgroundColor;
			console.log('Hello');
			event.target.style.backgroundColor = colorsValueClassSelected;
		}
	})
