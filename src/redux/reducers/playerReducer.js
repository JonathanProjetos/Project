import { SET_TOKEN, SET_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: '',
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
  default:
    return state;
  }
};

export default playerReducer;
