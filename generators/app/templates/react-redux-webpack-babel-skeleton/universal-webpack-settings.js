var path = require('path')

const settings = {
  server: {
    input: path.resolve(__dirname, 'ssr.js'),
    output: path.resolve(__dirname, 'dist/server/server.js')
  }
}
// const settings = {
//   server: {
//     input: './ssr.js',
//     output: './dist/server/server.js'
//   }
// }

module.exports = settings
