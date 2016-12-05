import { client as apolloClient } from 'apollo'
import * as mutations from 'apollo/mutations'

export default function* (params = {}) {
  return yield apolloClient.mutate(
    { mutation: mutations[params.mutation], variables: params.variables || null }
  )
}
