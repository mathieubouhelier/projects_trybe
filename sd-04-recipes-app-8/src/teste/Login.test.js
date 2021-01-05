import React from 'react';
import { fireEvent, getByText } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderWithRedux from '../helpers/renderWithRedux';
import App from '../App';
import { initial } from 'lodash';

describe('Testando tela inicial de login', () => {
  // Função auxiliar cria objeto com a rota '/'
  const renderWithRouter = (initialEntries = ['/']) => (
    <Router history={createMemoryHistory({ initialEntries })}>
      <App />
    </Router>
  );

  test('Renderiza a pagina inicial LOGIN', () => {
    const {
      getByText,
      getByTestId,
    } = renderWithRedux(
      renderWithRouter() /* Passar a rota aqui, ex.: (['/clientes']) */,
      { initialState: { saveEmail: '' } },
    );

    // Verificando texto Login
    const loginText = getByText(/Login/i);
    expect(loginText).toBeInTheDocument();

    // Verificando todo os (data-testid)
    const testEmail = getByTestId(/email-input/i);
    const testPassword = getByTestId(/password-input/i);
    const testBtn = getByTestId(/login-submit-btn/i);
    expect(testEmail).toBeInTheDocument();
    expect(testPassword).toBeInTheDocument();
    expect(testBtn).toBeInTheDocument();

    // Verificando texto botão entrar
    const testBtnTexto = getByText(/Entrar/i);
    expect(testBtnTexto).toBeInTheDocument();
  });
});

describe('Testando tela Login com email e senha', () => {
  const renderWithRouter = (initialEntries = ['/']) => (
    <Router history={createMemoryHistory({ initialEntries })}>
      <App />
    </Router>
  );

  test('Fazendo Login com email e senha', () => {
    const { getByTestId, getByText } = renderWithRedux(renderWithRouter(), {
      initialState: { saveEmail: '' },
    });

    // Obtendo Inputs email e senha
    const testEmail = getByTestId(/email-input/i);
    const testPassword = getByTestId(/password-input/i);

    // Criando usuário fake
    const userMock = [{ eamil: 'xablau@gmail.com', password: '123456789' }];

    // Realiza operação de inserir email e senha nos inputs
    userMock.forEach((user) => {
      fireEvent.change(testEmail, { target: { value: user.eamil } });
      expect(testEmail.value).toBe(user.eamil);

      fireEvent.change(testPassword, { target: { value: user.password } });
      expect(testPassword.value).toBe(user.password);

      fireEvent.click(getByText(/Entrar/i));
    });
  });
});
