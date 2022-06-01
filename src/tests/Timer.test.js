import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import { questionsResponse } from '../../cypress/mocks/questions';

describe('Testa o componente Timer', () => {
  test('Testa a chamada da função no timer', async () => { 
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    jest.useFakeTimers()

    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');

    await waitForElementToBeRemoved( () => screen.getByText(/carregando/i));
      setTimeout(() => {  
      expect(clearInterval).toHaveBeenCalled()
      },30000)
    
      jest.runAllTimers();

  });
})