const config = {
  development: {
    API_HOST: 'http://localhost:4000/graphql',
    CLIENT_HOST: 'http://localhost:3001'
  },
  test: {
    API_HOST: '',
    CLIENT_HOST: 'http://localhost:3001'
  },
  production: {
    API_HOST: '',
    CLIENT_HOST: '' // same domain
  },
  staging: {
    API_HOST: '',
    CLIENT_HOST: '' // same domain
  }
}

export default config[process.env.APP_ENV]
