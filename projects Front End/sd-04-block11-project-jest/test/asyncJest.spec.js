const answerPhone = require("../src/asyncJest");

/*
A função answerPhone recebe um parâmetro boleano.
Dependendo do parâmetro o retorno da função varia, veja a função no arquivo 'src/asyncJest.js'

Complete o código abaixo para testar as situações em que
a função recebe como parâmetro true e false, respectivamente.

ATENÇÃO!!! Edite apenas este arquivo. Não altere os arquivos da pasta 'src'.
*/

describe("o retorno do telefonema", () => {
  test("atende", async () => {
    const getAnswer = await answerPhone('Hello'); //Await to work in asynchrone
    expect(getAnswer).toEqual('Oi!');
    });
  test("ocupado", async () => {
    try{  //try and catch to get the error form the promise 
      await answerPhone();
    } catch (error) {
      expect(error).toEqual('Infelizmente não podemos atender...');
    }

  });
});
