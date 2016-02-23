if (process.env.NODE_ENV === 'production') {
  module.exports = require('router/createRouter.production')
} else {
  module.exports = require('router/createRouter.development')
}
