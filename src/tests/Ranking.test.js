import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import App from '../App';
import { mockLocalStorage} from  './mocks/mockData';



describe('Testando a tela de Ranking', () => {
  localStorage.setItem('ranking', JSON.stringify(mockLocalStorage));

  test('Testando se quando entrar na página de ranking é renderizado um titulo com o Nome Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');
    expect(history.location.pathname).toBe('/ranking');

    const elementTitle = screen.getByRole('heading', { level: 1 });

    expect(elementTitle).toHaveTextContent('Ranking');
  });

  test('Testando se é renderizado um botão na tela com o nome Início e quando clicado nele, para pagina de Login', async ()  => {

    const { history } = renderWithRouterAndRedux(<App />)
    history.push('/ranking');

    const elementButton = screen.getByRole('button', { name: 'Inicio' });
    expect(elementButton).toBeInTheDocument();

    userEvent.click(elementButton);
    expect(history.location.pathname).toBe('/');
  });

  test('Testando se é renderizado um jogador na tela', () => {
  const { history } = renderWithRouterAndRedux(<App />);
  history.push('/ranking');

  const elementName = screen.getByText(mockLocalStorage[2].name);
  const elementScore = screen.getByText(mockLocalStorage[2].score);
  const imgElement = screen.getAllByRole('img');

  expect(elementName).toBeInTheDocument();
  expect(elementScore).toBeInTheDocument();
  expect(imgElement[0]).toHaveAttribute('src', mockLocalStorage[2].picture);
  });

  test('Testando se os player são exibido em ordem crescente a partir do maior Score', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');


    const elementPlayerScore0 = screen.getByTestId('player-score-0');
    const elementPlayerScore1 = screen.getByTestId('player-score-1');
    const elementPlayerScore2 = screen.getByTestId('player-score-2');

    expect(elementPlayerScore0).toBeInTheDocument();
    expect(elementPlayerScore0).toBeInTheDocument();
    expect(elementPlayerScore0).toBeInTheDocument();

    expect(elementPlayerScore0).toHaveTextContent(mockLocalStorage[2].score);
    expect(elementPlayerScore1).toBeInTheDocument(mockLocalStorage[1].score);
    expect(elementPlayerScore2).toBeInTheDocument(mockLocalStorage[0].score);

  });

})

