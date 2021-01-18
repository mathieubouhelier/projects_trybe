import {
  verifyContainsText,
  clickButton,
  insertText,
  verifyContainsUrl,
  clickLastElement,
  createRecipe,
  createAndInsertsDataBase,
  dropAndTruncateDataBase,
  accessHomeAndLogin,
} from '../actions/actionBase';

describe('7 - Crie uma página de exclusão de uma receita.', () => {
  before(() => {
    createAndInsertsDataBase();
  })

  after(() => {
    dropAndTruncateDataBase();
  })

  beforeEach(() => {
    accessHomeAndLogin();
    createRecipe();
  })

  it('Tentar excluir uma receita passando a senha errada e validar a mensagem de erro', () => {
    clickLastElement('a');
    clickButton('[data-testid="excluir-receita"]');
    insertText('[data-testid="senha"]','1234');
    clickButton('[data-testid="confirmar"]');
    verifyContainsText('Senha Incorreta.');
  })

  it('Excluir receita com sucesso e verificar se foi houve redirecionamento à página de listagem de receitas', () => {
    clickLastElement('a');
    clickButton('[data-testid="excluir-receita"]');
    insertText('[data-testid="senha"]','12345678');
    clickButton('[data-testid="confirmar"]');
    verifyContainsUrl('/')
    verifyContainsText('Cookmaster');
    verifyContainsText('Receitas');
  })
});
