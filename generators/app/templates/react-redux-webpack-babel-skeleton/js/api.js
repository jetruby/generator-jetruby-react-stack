// Endpoints for API
// using services/endpoint.js

import { endpoint } from 'services/endpoint'

export const usersAPI = endpoint('users')

// and then you have the following methods:
//
// usersAPI.getCollection
// usersAPI.get
// usersAPI.create
// usersAPI.update
// usersAPI.destroy
//
