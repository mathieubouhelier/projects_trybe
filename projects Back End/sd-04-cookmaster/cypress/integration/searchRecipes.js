import {
  verifyContainsText,
  clickButton,
  insertText,
  verifyContainsUrl,
  verifyNotContainsText,
  accessHomeAndLogin,
  createAndInsertsDataBase,
  dropAndTruncateDataBase,
} from '../actions/actionBase';

describe('4 - Cria uma página de buscar de receitas.', () => {
  before(() => {
    createAndInsertsDataBase();
  })

  after(() => {
    dropAndTruncateDataBase();
  })

  beforeEach(() => {
    accessHomeAndLogin();
  })

  it('Verificar se o botão "Buscar Receitas" redireciona para a página das minhas receitas', () => {
    clickButton('[data-testid="buscar-receita"]');
    verifyContainsUrl('/recipes/search');
  })

  it('Validar se consigo fazer uma busca de receita', () => {
    clickButton('[data-testid="buscar-receita"]');
    insertText('[data-testid="receita"]', 'Receita de Bolo');
    clickButton('[data-testid="buscar"]');
    verifyContainsText('Receita de Bolo');
  })

  it('Validar se não possível buscar uma receita que não existe', () => {
    clickButton('[data-testid="buscar-receita"]');
    insertText('[data-testid="receita"]', 'Receita de que não existe');
    clickButton('[data-testid="buscar"]');
    verifyNotContainsText('Receita de que não existe');
  })
});
