/* eslint-disable max-len */

/*
  Você é responsável por escrever o código do sistema de pedidos de um restaurante. Deve ser possível, através desse sistema, cadastrar um menu. Dado que um menu foi cadastrado, o sistema deve disponibilizar um objeto através do qual se consegue:
  - ler o menu cadastrado;
  - fazer pedidos;
  - verificar o que foi pedido;
  - somar o valor da conta.
  A estrutura deste código e deste objeto já foi definida e você irá implementá-la.
  Abaixo você verá uma série de testes e passos que devem ser, NECESSARIAMENTE, feitos em ordem para o bom desenvolvimento do sistema. Eles guiarão você pelo desenvolvimento.
  Parâmetros:
  - Um objeto. Exemplos: { food: {'coxinha': 3.9, 'sopa': 9.9}, drink: {'agua': 3.9, 'cerveja': 6.9} }.
  Comportamento:
  const meuRestaurante = createMenu({ food: {'coxinha': 3.9, 'sopa': 9.9}, drink: {'agua': 3.9, 'cerveja': 6.9} }).
  meuRestaurante.fetchMenu() // Retorno: { food: {'coxinha': 3.9, 'sopa': 9.9}, drink: {'agua': 3.9, 'cerveja': 6.9} }
  meuRestaurante.order('coxinha') // Retorno: undefined
  meuRestaurante.consumption // Retorno: ['coxinha']
  meuRestaurante.pay() // Retorno: 3.9
  Uma função createMenu retorna um objeto com as seguintes características:
  - Uma chave `fetchMenu` retorna o objeto que a função `createMenu` recebe por parâmetro. O menu tem sempre duas chaves, `food` e `drink`, no seguinte formato:
  const meuRestaurante = createMenu({
    food: {'coxinha': 3.90, 'sanduiche', 9.90},
    drinks: {'agua': 3.90, 'cerveja': 6.90}
  });
  meuRestaurante.fetchMenu() // Retorno: Menu acima
  - Uma chave `consumption` que contém um array de strings, com cada string sendo a chave de um pedido. Por exemplo: ['coxinha', 'cerveja']
  - Uma chave `order` que tem uma função que, recebida uma string como parâmetro, adiciona essa string à lista salva em `consumption`.
  - Uma chave `pay` que, quando chamada, invoca uma função que soma o valor de todos os pedidos e dá o preço com acréscimo de 10%.
  IMPORTANTE: COMECE PELO TESTE 1 DO ARQUIVO `tests/restaurant.spec.js` E NÃO PELO PASSO 1 DESTE ARQUIVO!
*/

// PASSO 1: Crie uma função `createMenu()` que, dado um objeto passado por parâmetro, retorna um objeto com o seguinte formato: { fetchMenu: objetoPassadoPorParametro }.
// DONE!
// Agora faça o TESTE 2 no arquivo `tests/restaurant.spec.js`.

//------------------------------------------------------------------------------------------

// PASSO 2: Adicione ao objeto retornado por `createMenu` uma chave `consumption` que, como valor inicial, tem um array vazio.
// DONE!
// Agora faça o TESTE 5 no arquivo `tests/restaurant.spec.js`.

//------------------------------------------------------------------------------------------

// PASSO 3: Crie uma função, separada da função `createMenu()`, que, dada uma string recebida por parâmetro, adiciona essa string ao array de `objetoRetornado.consumption`. Adicione essa função à chave `order`.
// DICA: para criar isso, você vai precisar definir a função `createMenu()`, definir o objeto que a `createMenu()` define separadamente dela e, depois, a função que será definida em `order`.
// ```
// const restaurant = {}

//
// const createMenu = (myMenu) => // Lógica que edita o objeto `restaurant`
//
// const orderFromMenu = (request) => // Lógica que adiciona à chave `consumption` de `restaurant` a string recebida no parâmetro `request`. Essa função deve ser associada à chave `order` de `restaurant`
// ```
// Agora faça o TESTE 6 no arquivo `tests/restaurant.spec.js`.
// Done
//------------------------------------------------------------------------------------------

// PASSO 4: Adicione ao objeto retornado por `createMenu()` uma chave `pay` com uma função que varre todo os itens de `objetoRetornado.consumption`, soma o preço de todos checando-os no menu e retorna o valor somado acrescido de 10%. DICA: para isso, você precisará varrer tanto o objeto da chave `food` quanto o objeto da chave `drink`.

function orderFromMenu(request) {
  this.consumption.push(request);
}

function payMenu() {
  const foodDrink = Object.assign(
    {},
    this.fetchMenu.food,
    this.fetchMenu.drinks,
  );
  const consumptionList = this.consumption;
  let bill = 0;
  for (let index = 0; index < consumptionList.length; index += 1) {
    bill += foodDrink[consumptionList[index]];
  }
  bill = parseFloat(parseFloat(bill * 1.1).toPrecision(4));
  return bill;
}

const createMenu = objetoPassadoPorParametro => ({
  fetchMenu: objetoPassadoPorParametro,
  consumption: [],
  order: orderFromMenu,
  pay: payMenu,
});

// const retaurant = createMenu('objetoQualquer');
// console.log(retaurant);
// const orderCoxinha = retaurant.order("coxinha");
// // console.log(orderCoxinha);
// console.log(retaurant.consumption)

// const objetoRetornado2 = createMenu({ food: {'coxinha': 3.90, 'sanduiche': 9.90}, drinks: {'agua': 3.90, 'cerveja': 6.90} });
// // console.log(objetoRetornado2);
// // objetoRetornado2.consumption = [];
// objetoRetornado2.order('coxinha');
// objetoRetornado2.order('agua');
// objetoRetornado2.order('coxinha');
// // console.log('Consomation', objetoRetornado2.consumption);
// console.log(objetoRetornado2.pay());
// console.log(typeof objetoRetornado2.pay());
    // console.log('bill', createMenu.pay);
    // const Food = objetoRetornado2.fetchMenu.food;
    // console.log('Food coxinha value', Food.coxinha);
    // console.log('Food_Drink', Food_Drink);

  // const consumption = objetoRetornado2.consumption = [];

// console.log('consumption', consumption);
// console.log('Food_Drink', Food_Drink);
// console.log('bill', bill);

//   console.log(Object.values(objetoRetornado2.fetchMenu.food));
// const valueFoodConsumed = Object.values(objetoRetornado2.fetchMenu.food);
// console.log('valueFoodConsumed',valueFoodConsumed);
// const valueDrinkConsumed = Object.values(objetoRetornado2.fetchMenu.drinks);
          // console.log('valueFoodConsumedSum',valueFoodConsumedSum);
          // console.log('valueDrinkConsumedSum',valueDrinkConsumedSum);
module.exports = createMenu;
