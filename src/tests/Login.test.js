import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import App from '../App';

describe('Testa as funcionalidades do pagina login',() => {
  test('testa se o campo de input name está presente na tela e se é possivel digitar', () => { 
    const { history } = renderWithRouterAndRedux(<Login />);
    history.push('/');

    const textName = screen.getByTestId("input-player-name");
    expect(textName).toBeInTheDocument();

    const inputName = screen.getAllByRole('textbox')
    userEvent.type(inputName[0], 'xablau')

   });

  test('testa se o campo de input email está presente na tela e se é possivel digitar', () => { 
    const { history } = renderWithRouterAndRedux(<Login />);
    history.push('/');

    const textEmail = screen.getByTestId("input-gravatar-email");
    expect(textEmail).toBeInTheDocument();

    const inputEmail = screen.getAllByRole('textbox');
    userEvent.type(inputEmail[1], 'coisa@gmail.com');
    });

  test('testa se ao clicar no botão play e redirecionado', async () => { 
    const { history } = renderWithRouterAndRedux(<App />);

    const inputName1 = screen.getAllByRole('textbox')
    userEvent.type(inputName1[0], 'xablau')
      
    const inputEmail1 = screen.getAllByRole('textbox');
    userEvent.type(inputEmail1[1], 'coisa@gmail.com');

    const buttonPlay = screen.getByTestId('btn-play');
    expect(buttonPlay).toBeInTheDocument();
  
    userEvent.click(buttonPlay);
    await waitFor( ()=> expect( screen.getByText('xablau')).toBeInTheDocument())

  })

})