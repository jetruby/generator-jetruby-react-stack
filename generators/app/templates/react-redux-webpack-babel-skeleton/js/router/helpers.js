export const isLoggedIn = (store, toRoute, fromRoute, done) => {
  if (store.getState().currentUser.authToken) {
    return true
  }

  return Promise.reject({ redirect: { name: 'onboarding.login' } })
}

export const isNotLoggedIn = (store, toRoute, fromRoute, done) => {
  if (store.getState().currentUser.authToken) {
    return Promise.reject({ redirect: { name: 'settings' } })
  }

  return true
}
