const fetchToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';

  const token = await fetch(URL)
    .then((response) => response.json())
    .then((response) => response.token)
    .catch((erro) => erro);

  return token;
};

export default fetchToken;
