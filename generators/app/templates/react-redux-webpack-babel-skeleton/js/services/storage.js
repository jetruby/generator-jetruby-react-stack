// factory localStorage to work both in browser and nodejs

let storage

if (typeof localStorage === 'undefined' || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage
  storage = new LocalStorage('tmp/storage')
} else {
  storage = localStorage
}

export default storage
