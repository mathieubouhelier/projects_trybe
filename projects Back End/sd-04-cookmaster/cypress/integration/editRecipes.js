import {
  verifyContainsText,
  clickButton,
  insertText,
  clickLinkOrText,
  createRecipe,
  clickLastElement,
  createAndInsertsDataBase,
  dropAndTruncateDataBase,
  accessHomeAndLogin,
} from '../actions/actionBase';

import { name } from 'faker';

describe('6 - Crie uma página de edição de receitas.', () => {
  const randomName = name.title();
  const randomIngredient = name.firstName();
  const randomPrepare = name.firstName();

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

  it('Editar o nome da receita', () => {
    clickButton('[data-testid="minhas-receitas"]');
    clickLastElement('a');
    clickButton('[data-testid="editar-receita"]');
    cy.get('[data-testid="nome-receita"]').clear();
    insertText('[data-testid="nome-receita"]', randomName);
    clickButton('[data-testid="postar-receita"]');
    verifyContainsText(randomName);
  })

  it('Editar os ingredientes da receita', () => {
    clickButton('[data-testid="minhas-receitas"]');
    clickLastElement('a');
    clickButton('[data-testid="editar-receita"]');
    clickLinkOrText('Excluir Ingrediente');
    insertText('[data-testid="ingredientes"]', randomIngredient);
    clickButton('[data-testid="adicionar-ingrediente"]');
    clickButton('[data-testid="postar-receita"]');
    clickLastElement('a');
    verifyContainsText(randomIngredient);
  })

  it('Editar o modo de preparo da receita', () => {
    clickButton('[data-testid="minhas-receitas"]');
    clickLastElement('a');
    clickButton('[data-testid="editar-receita"]');
    cy.get('[data-testid="modo-de-preparo"]').clear();
    insertText('[data-testid="modo-de-preparo"]', randomPrepare);
    clickButton('[data-testid="postar-receita"]');
    clickLastElement('a');
    verifyContainsText(randomPrepare);
  })
});
