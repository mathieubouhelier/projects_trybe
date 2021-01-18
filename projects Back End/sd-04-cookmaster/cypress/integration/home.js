import {
  verifyContainsText,
  verifyElementNotVisible,
  verifyElementVisible,
  login,
  createAndInsertsDataBase,
  dropAndTruncateDataBase,
} from '../actions/actionBase';

describe('1 - Crie uma tela de listagem de receitas.', () => {
  before(() => {
    createAndInsertsDataBase();
  })

  after(() => {
    dropAndTruncateDataBase();
  })

  beforeEach( () => {
    cy.visit('http://localhost:3000/');
  })

  it('Verificar se estou na home e há os títulos "Cookmaster" e "Receitas" na tela', () => {
    verifyContainsText('Cookmaster');
    verifyContainsText('Receitas');
  })

  it('Verificar se não existe o botão "Nova Receita" quando se  acessa a home sem estar logado', () => {
    verifyContainsText('Cookmaster');
    verifyContainsText('Receita de Bolo');
    verifyContainsText('bruno batista');
    verifyElementNotVisible('[data-testid="nova-receita"]');
  })

  it('Verificar se existe o botão "Nova Receita" quando estou logado e acessando a home', () => {
    login(Cypress.env('login'), Cypress.env('password'));
    verifyContainsText('Cookmaster');
    verifyContainsText('bruno batista');
    verifyContainsText('Nova Receita');
    verifyElementVisible('[data-testid="nova-receita"]');
  })

  it('Verificar se existe, na tela, uma receita previamente cadastrada com "nome da receita", "nome do usuário" e o link da receita em "Ver mais"', () => {
    verifyContainsText('Receita de Bolo');
    verifyContainsText('bruno batista');
    verifyContainsText('Ver mais');
  })
});
