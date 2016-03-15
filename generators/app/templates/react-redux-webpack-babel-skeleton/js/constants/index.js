const config = {
  development: {
    API_HOST: ''
  },
  test: {
    API_HOST: ''
  },
  production: {
    API_HOST: ''
  },
  staging: {
    API_HOST: ''
  }
}

export default config[process.env.APP_ENV]
