export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER = 'SET_USER';
export const TIME_OVER = 'TIME_OVER';
export const ASSERTIONS = 'ASSERTIONS';
export const SET_TIMER = 'SET_TIMER';
export const SET_SCORE = 'SET_SCORE';
export const NEXT_GAME = 'NEXT_GAME';
export const RENDER_BUTTON = 'RENDER_BUTTON';

export const actionSetUser = ({ name, email }) => ({
  type: SET_USER,
  payload: {
    name,
    email,
  },
});

export const actionSetTokem = (token) => ({
  type: SET_TOKEN,
  payload: token,
});

export const timeOver = () => ({
  type: TIME_OVER,
});

export const clickAssertions = () => ({
  type: ASSERTIONS,
});

export const setTimer = (timer) => ({
  type: SET_TIMER,
  payload: timer,
});

export const actionScore = (score) => ({
  type: SET_SCORE,
  payload: score,
});

export const actionNextQuestion = () => ({
  type: NEXT_GAME,
});

export const actionRenderButton = () => ({
  type: RENDER_BUTTON,
});
