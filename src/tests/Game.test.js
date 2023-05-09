import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import {questionsResponse, invalidTokenQuestionsResponse} from '../../cypress/mocks/questions';
import App from '../App';

describe('Testar a aplicaçãoda pagina game', () => {
  test('Testa se tem uma imagem renderizada na tela', () => { 
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');

    const imgGravatar = screen.getByRole('img');
    expect(imgGravatar).toBeInTheDocument();
    
  });

  test('Testa se o campo para o nome do usuario está renderizado na tela', () => { 
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');
    
    const nameUser = screen.getByRole('heading', { level: 1 });
    expect(nameUser).toBeInTheDocument();
   });


  test('Testa se o campo de score e renderizado na tela', () => { 
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');

    const inputScore = screen.getByTestId('header-score')
    expect(inputScore).toBeInTheDocument();
    });
  
  test('Testa se o campo para os botões existe na tela', async () => { 
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');

    await waitForElementToBeRemoved( () => screen.getByText(/carregando/i));

    const divButton = screen.getByTestId('answer-options');
    expect(divButton).toBeInTheDocument();
    jest.restoreAllMocks();
   })

  test('Testa se a Api e chamada ', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');

    expect(global.fetch).toHaveBeenCalled();
    jest.restoreAllMocks();
   });

  test('Testa se a Api for chamada com token "" volta para a tela login', async () => { 
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(invalidTokenQuestionsResponse),
    });

    const { history } = renderWithRouterAndRedux(<App /> ,{}, '/Game');

    await waitForElementToBeRemoved( () => screen.getByText(/carregando/i));

    expect(global.fetch).toHaveBeenCalled();

    const returnLogin = history.location.pathname
    expect(returnLogin).toBe('/')
    jest.restoreAllMocks();
   });

   test('Testa a aplicação no momento do click das perguntas', async () => { 
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    jest.useFakeTimers();

    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');

    await waitForElementToBeRemoved( () => screen.getByText(/carregando/i));
    

    await waitFor(() => {
      jest.advanceTimersByTime(5000);
      const buttonCorrect = screen.getByTestId('correct-answer');
      expect(buttonCorrect).toBeInTheDocument();
      userEvent.click(buttonCorrect);
      const buttonNext = screen.getByTestId('btn-next')
      expect(buttonNext).toBeInTheDocument();
      userEvent.click(buttonNext);
    });

    await waitFor(() => {
      jest.advanceTimersByTime(5000);
      const buttonCorrect = screen.getByTestId('correct-answer');
      expect(buttonCorrect).toBeInTheDocument();
      userEvent.click(buttonCorrect);
      const buttonNext = screen.getByTestId('btn-next')
      expect(buttonNext).toBeInTheDocument();
      userEvent.click(buttonNext);
    });

    await waitFor(() => {
      jest.advanceTimersByTime(5000);
      const buttonCorrect = screen.getByTestId('correct-answer');
      expect(buttonCorrect).toBeInTheDocument();
      userEvent.click(buttonCorrect);
      const buttonNext = screen.getByTestId('btn-next')
      expect(buttonNext).toBeInTheDocument();
      userEvent.click(buttonNext);
    });

    await waitFor(() => {
      jest.advanceTimersByTime(5000);
      const buttonCorrect = screen.getByTestId('correct-answer');
      expect(buttonCorrect).toBeInTheDocument();
      userEvent.click(buttonCorrect);
      const buttonNext = screen.getByTestId('btn-next')
      expect(buttonNext).toBeInTheDocument();
      userEvent.click(buttonNext);
    });

    await waitFor(() => {
      jest.advanceTimersByTime(5000);
      const buttonCorrect = screen.getByTestId('correct-answer');
      expect(buttonCorrect).toBeInTheDocument();
      userEvent.click(buttonCorrect);
      const buttonNext = screen.getByTestId('btn-next')
      expect(buttonNext).toBeInTheDocument();
      userEvent.click(buttonNext);
    });

    const locationFeedback = history.location.pathname
    await waitFor( ()=> expect(locationFeedback).toBe('/feedback') )
   });

});