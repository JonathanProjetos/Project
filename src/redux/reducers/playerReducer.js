import { SET_TOKEN, SET_USER, TIME_OVER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: '',
  timeOut: false,
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
  default:
    return state;
  }
};

export default playerReducer;
