import {
  registerUser,
  clickButton,
  verifyContainsText,
  createAndInsertsDataBase,
  dropAndTruncateDataBase,
} from '../actions/actionBase';

import { name, internet } from 'faker';

describe('2 - Crie uma página de cadastro de usuários.', () => {
  const randomName = name.firstName();
  const randomEmail = internet.email();
  const randomLast = name.lastName();

  before(() => {
    createAndInsertsDataBase();
  })

  after(() => {
    dropAndTruncateDataBase();
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  it('Cadastro de uma pessoa usuária com sucesso', () => {
    clickButton('[data-testid="login"]');
    clickButton('[data-testid="cadastrar"]');
    registerUser(randomEmail, '12345678', '12345678', randomName, randomLast);
    verifyContainsText('Cadastro efetuado com sucesso!');
  })

  it('Validação o campo "Email"', () => {
    clickButton('[data-testid="login"]');
    clickButton('[data-testid="cadastrar"]');
    registerUser(' ', '12345678', '12345678', randomName, randomLast);
    verifyContainsText('O email deve ter o formato email@mail.com');
  })

  it('Validação do campo "Senha"', () => {
    clickButton('[data-testid="login"]');
    clickButton('[data-testid="cadastrar"]');
    registerUser(randomEmail, ' ', '12345678', randomName, randomLast);
    verifyContainsText('A senha deve ter pelo menos 6 caracteres');
  })

  it('Validação do campo "Confirmar Senha"', () => {
    clickButton('[data-testid="login"]');
    clickButton('[data-testid="cadastrar"]');
    registerUser(randomEmail, '12345678', ' ', randomName, randomLast);
    verifyContainsText('As senhas tem que ser iguais');
  })

  it('Validação do campo "Nome"', () => {
    clickButton('[data-testid="login"]');
    clickButton('[data-testid="cadastrar"]');
    registerUser(randomEmail, '12345678', '12345678', ' ', randomLast);
    verifyContainsText('O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras');
  })

  it('Validação do campo "Sobrenome"', () => {
    clickButton('[data-testid="login"]');
    clickButton('[data-testid="cadastrar"]');
    registerUser(randomEmail, '12345678', '12345678', randomName, ' ');
    verifyContainsText('O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras');
  })
});
