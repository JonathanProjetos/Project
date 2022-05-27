import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('Testa a tela de Feedback', () => {
  test('Testa os componentes presentes na tela', () => { 
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const tagImg  = screen.getByRole('img');
    expect(tagImg).toBeInTheDocument();
   })

  test('Testa se a tag nescessaria está presente para receber a mensagem de resultado', () => { 
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const mesnageResultado = screen.getByTestId('feedback-text');
    expect(mesnageResultado).toBeInTheDocument();
   })

   test('Testa se a tag nescessaria para score esnta presente na tela para receber o resultado', () => { 
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const tagScore = screen.getByTestId('header-score')
    expect(tagScore).toBeInTheDocument();
   })

  test('Testa se o campo de placar esta sendo renderizado na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const tagPlacar = screen.getByRole('heading', {level: 2, name: /Seu Placar final foi:/i })
    expect(tagPlacar).toBeInTheDocument();
   })

   test('Testa se o campo de placar de acertos esta sendo renderizado na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const tagAcertos = screen.getByRole('heading', {level: 2, name: /Você acertou :/i })
    expect(tagAcertos).toBeInTheDocument();
   })

  test('Testa se ao clicar no botão Play Again volta para a tela home', async() => { 
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const buttonPlayAgain = screen.getByRole('button', {name: /play again/i})
    expect(buttonPlayAgain).toBeInTheDocument();

    userEvent.click(buttonPlayAgain);

    await waitFor( ()=> expect(history.location.pathname).toBe('/') )
   })

  test('Testa se ao clicar no botão ranking redireciona para a pagina ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const buttonRanking = screen.getByRole('button', {name: /ranking/i});
    expect(buttonRanking).toBeInTheDocument();

    userEvent.click(buttonRanking);

    expect(history.location.pathname).toBe('/ranking')

  })
})