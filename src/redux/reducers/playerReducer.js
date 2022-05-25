import {
  SET_TOKEN,
  SET_USER, TIME_OVER,
  ASSERTIONS, NEXT_GAME,
  RENDER_BUTTON, SET_TIMER, SET_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: '',
  timeOut: false,
  timer: 30,
  round: 0,
  isButtonRender: false,

};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER:
    return {
      ...state, name: action.payload.name, gravatarEmail: action.payload.email,
    };
  case SET_TOKEN:
    localStorage.setItem('token', action.payload);
    return {
      ...state, token: action.payload,
    };
  case TIME_OVER:
    return {
      ...state, timeOut: !state.timeOut,
    };
  case RENDER_BUTTON:
    return {
      ...state,
      isButtonRender: true,
    };
  case ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case SET_TIMER:
    return {
      ...state, timer: action.payload,
    };
  case SET_SCORE:
    return {
      ...state, score: action.payload,
    };
  case NEXT_GAME:
    return {
      ...state,
      round: state.round + 1,
      isButtonRender: false,
    };
  default:
    return state;
  }
};

export default playerReducer;
