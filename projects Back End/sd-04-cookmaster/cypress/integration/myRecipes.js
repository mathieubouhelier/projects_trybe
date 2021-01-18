import {
  verifyContainsText,
  login,
  clickButton,
  verifyContainsUrl,
  createAndInsertsDataBase,
  dropAndTruncateDataBase,
} from '../actions/actionBase';

describe('8 - Crie uma página de Minhas receitas.', () => {
  before(() => {
    createAndInsertsDataBase();
  })

  after(() => {
    dropAndTruncateDataBase();
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  it('Validar se o botão "Minhas Receitas" está redirecionando para página das minhas receitas', () => {
    login(Cypress.env('login'), Cypress.env('password'));
    clickButton('[data-testid="minhas-receitas"]');
    verifyContainsUrl('/me/recipes');
  })

  it('Validar se a página "Minhas Receitas" está listando as receitas da pessoa usuária', () => {
    login(Cypress.env('login'), Cypress.env('password'));
    clickButton('[data-testid="minhas-receitas"]');
    verifyContainsText('Receita de Bolo');
  })

  it('Validar se, quando o usuário não está logado, tentar acessar a url das minhas receitas leva a um redirecionamento para a tela de login', () => {
    cy.visit('http://localhost:3000/me/recipes');
    verifyContainsUrl('/login');
  })
});
