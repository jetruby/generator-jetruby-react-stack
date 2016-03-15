import Repoint from 'repoint'
import { camelizeKeys } from 'humps'
import constants from 'constants'

const repoint = new Repoint({
  host: constants.API_HOST,
  beforeSuccess: (data) => camelizeKeys(data)
})

const users = repoint.generate('users')

export {
  users
}
