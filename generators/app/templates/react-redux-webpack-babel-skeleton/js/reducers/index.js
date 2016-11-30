import { combineReducers } from 'redux'
import currentUser from 'reducers/currentUser'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  routing: routerReducer,
  currentUser
})

export default rootReducer
