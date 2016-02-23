import R from 'ramda'

export const assocUid = R.assoc('uid')
export const onlyIds = R.project(['id', 'uid'])
export const mapKeys = R.curry((fn, obj) => R.fromPairs(R.map(R.adjust(fn, 0), R.toPairs(obj))))
export const mapValues = R.curry((fn, obj) => R.fromPairs(R.map(R.adjust(fn, 1), R.toPairs(obj))))

// appendWithOrderBy : String -> [a] -> [b] -> [b]
export const sortWithOrderBy = R.curry((prop, sortList, list) => (
  R.map((a) => R.find(R.propEq(prop, a), list), sortList))
)

// appendUniqWithOrderBy : String -> [a] -> [b] -> [b] -> [b]
export const appendUniqWithOrderBy = R.curry((prop, orderList, source, dest) => (
  R.compose(
    R.uniqBy(R.prop(prop)),
    R.concat(dest)
  )(sortWithOrderBy(prop)(orderList)(source))
))

export const appendUniqWithOrderById = appendUniqWithOrderBy('id')

// findBy :: (k: v) -> [(k: v)] -> (k: v)
export const findBy = R.curry((propObj, list) => (
  R.find(R.allPass(R.map((pair) => R.propEq(pair[0], pair[1]), R.toPairs(propObj))), list)
))
