/*
  A função average recebe um array (tamanho variável) e retorna a média dos valores recebidos.
  Caso a função receba algum valor não númerico ou um array vazio,
  o valor undefined deve ser retornado.
  Todos os resultados devem ser arredondados para valores inteiros. Ex: 4,6 vira 5; 1,3 vira 1.

  Parâmetros:
    - Um array. Exemplos: [1, 2]; [1, 2, 3, 4, 5]; [1, 2, '3']; [];
  Comportamento:
    - average([2, 2]) // Retorno: 2;
    - average([1, 2]) // Retorno: 1;
    - average([1, '2']) // Retorno: undefined;
*/

const average = (input) => {
  let output;
  let sum = 0;
  let flag = 'ok';
  if (input.length === 0) flag = 'undefined';
  for (let i = 0; i < input.length; i += 1) {
    if (typeof (input[i]) !== 'number') flag = 'undefined';
    sum += input[i];
  }
  if (flag !== 'undefined') output = Math.round(sum / input.length);
  return output;
};

// console.log('average 2 2 ',average([2, 2]));
// console.log('average 1 2 ',average([1, 2]));
// console.log('average 9.2 1 ',average([9.2, 1]));
// console.log('average 1.3 1 ',average([1.1, 1]));
// console.log('average test ',average('test'));
// console.log('type of test ',typeof (average('test')));

module.exports = average;
