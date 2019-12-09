export default {
  API_ENDPOINT:
    process.env.NODE_ENV === 'production'
      ? 'https://warm-dawn-13516.herokuapp.com/api'
      : 'http://localhost:8000/api',
  TOKEN_KEY: 'Groop-client-auth-token',
};
