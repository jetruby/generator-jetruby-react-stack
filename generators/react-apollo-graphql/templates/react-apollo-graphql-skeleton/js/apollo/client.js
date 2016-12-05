import config from 'constants/config'
import ApolloClient, { createNetworkInterface } from 'apollo-client'

const client = new ApolloClient({
  ssrMode: true,
  networkInterface: createNetworkInterface({
    uri: config.API_HOST,
    opts: {
      credentials: 'same-origin'
    },
    transportBatching: true
  })
})

export default client
