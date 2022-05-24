import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import Login from '../pages/Login';

describe('Testa as funcionalidades do pagina login',() => {
  test('testa se o campo de input name está presente na tela e se é possivel digitar', () => { 
    const { history } = renderWithRouterAndRedux(<Login />);
    history.push('/');

    const textName = screen.getByText('Nome:');
    expect(textName).toBeInTheDocument();

    const inputName = screen.getAllByRole('textbox')
    userEvent.type(inputName[0], 'xablau')

   });

   test('testa se o campo de input email está presente na tela e se é possivel digitar', () => { 
    const { history } = renderWithRouterAndRedux(<Login />);
    history.push('/');

    const textEmail = screen.getByText('Email:');
    expect(textEmail).toBeInTheDocument();

    const inputEmail = screen.getAllByRole('textbox');
    userEvent.type(inputEmail[1], 'coisa@gmail.com');
    });

    test('testa se ao clicar no botão play e redirecionado', () => { 
      const { history } = renderWithRouterAndRedux(<Login />);
      history.push('/');

      const buttonPlay = screen.getByRole('button', { name: /play/i});
      expect(buttonPlay).toBeInTheDocument()

      userEvent.click(buttonPlay)

      const rotaPagePlay = history.location.pathname;
      expect(rotaPagePlay).toBe('/Game')
     })
})