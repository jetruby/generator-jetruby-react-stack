import cuid from 'cuid'
import { mapValues } from 'utils/helpers'
import R from 'ramda'

export function* assocUid(normalizedCollection) {
  return mapValues((el) => R.merge({ uid: cuid() })(el), normalizedCollection)
}
