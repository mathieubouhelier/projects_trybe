import {
  verifyContainsText,
  clickButton,
  verifyContainsUrl,
  insertText,
  verifyNotContainsText,
  clickLinkOrText,
  createAndInsertsDataBase,
  dropAndTruncateDataBase,
  accessHomeAndLogin,
} from '../actions/actionBase';

describe('5 - Crie uma página de cadastro de receitas.', () => {
  before(() => {
    createAndInsertsDataBase();
  })

  after(() => {
    dropAndTruncateDataBase();
  })

  beforeEach(() => {
    accessHomeAndLogin();
  })

  it('Verificar se o botão "Nova Receita" direciona para página de cadastrar receitas', () => {
    clickButton('[data-testid="nova-receita"]');
    verifyContainsUrl('/recipes/new');
    verifyContainsText('Nova Receita');
  })

  it('Cadastrar uma receita', () => {
    clickButton('[data-testid="nova-receita"]');
    insertText('[data-testid="nome-receita"]', 'Receita de pão');
    insertText('[data-testid="ingredientes"]', 'Trigo');
    clickButton('[data-testid="adicionar-ingrediente"]');
    insertText('[data-testid="modo-de-preparo"]', '20 minutos no forno');
    clickButton('[data-testid="postar-receita"]');
  })

  it('Remover um ingrediente da receita', () => {
    clickButton('[data-testid="nova-receita"]');
    insertText('[data-testid="ingredientes"]', 'Trigo');
    clickButton('[data-testid="adicionar-ingrediente"]');
    clickLinkOrText('Excluir Ingrediente');
    verifyNotContainsText('Trigo');
  })
});
