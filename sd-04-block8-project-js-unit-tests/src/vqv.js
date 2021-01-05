/* eslint-disable no-unused-vars */

/*
  Use template literals para escrever uma função que,
  recebe seu nome e sua idade e retorna o parágrafo descrito abaixo.
  Caso a função seja chamada sem nenhum parâmetro, o valor undefined deve ser retornado.

  Parâmetros:
    - Uma string;
    - Um número.
  Comportamento:
    vqv(Tunico, 30) // Retorna:
      'Oi, meu nome é Tunico!
      tenho 30 anos,
      trabalho na Trybe e mando muito em programação!
      #VQV!'
*/
const vqv = (nome, idade) => {
  let output;
  // console.log('nome',nome, 'idade', idade);

  if (typeof nome !== 'undefined') {
    output = `Oi, meu nome é ${nome}!
Tenho ${idade} anos,
trabalho na Trybe e mando muito em programação!
#VQV!`;
  }
  return output;
};


module.exports = vqv;

// console.log('test empty',vqv());
// // console.log('test empty',vqv('','30'));
// console.log('test bob 30',vqv('Bob','30'));
// console.log(vqv('Bob','30'));
