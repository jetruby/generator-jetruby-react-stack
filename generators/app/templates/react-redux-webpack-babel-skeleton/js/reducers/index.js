import { combineReducers } from 'redux'
import currentUser from 'reducers/currentUser'
import { router5Reducer } from 'redux-router5'

const rootReducer = combineReducers({
  router: router5Reducer,
  currentUser
})

export default rootReducer
