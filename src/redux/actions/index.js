export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER = 'SET_USER';
export const TIME_OVER = 'TIME_OVER';

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
