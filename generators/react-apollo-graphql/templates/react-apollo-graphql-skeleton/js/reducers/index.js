import { combineReducers } from 'redux'
import ApolloClient from 'apollo-client'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import currentUser from 'reducers/currentUser'


export default function createRootReducer(apolloClient) {
  return combineReducers({
    routing: routerReducer,
    apollo: apolloClient.reducer(),
    currentUser
  })
}
