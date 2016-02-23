import fetch from 'isomorphic-fetch'
import { camelizeKeys } from 'humps'
import R from 'ramda'
import { normalize, arrayOf } from 'normalizr'
import Path from 'path-parser'
import param from 'jquery-param'
import pluralize from 'pluralize'

// 1) Standardizing response (pagination, normalization) and Error handling

const API = {
  namespace: 'http://localhost:6012'
}

const IS_COLLECTION = '__collection__'

const commonMethods = {
  // :: String -> [String] -> (k: v) -> (k: v) -> (a -> b)
  get: R.curry((url, idAttributes, params, schema, headers = {}) => {
    const idAttributeObject = R.pick(idAttributes, params)
    const missingIdAttibutes = R.reject(
      R.flip(R.contains)(R.keys(idAttributeObject)), R.reject(R.equals(IS_COLLECTION), idAttributes))
    const lastIdAttribute = R.last(idAttributes)
    let queryParams
    let buildedUrl

    if (!R.isEmpty(missingIdAttibutes)) {
      throw new Error(`You must provide "${missingIdAttibutes}" in params`)
    }

    if (idAttributes.length === 1 && lastIdAttribute === IS_COLLECTION) {
      buildedUrl = url
      queryParams = params
    }

    if (idAttributes.length > 1 || lastIdAttribute !== IS_COLLECTION) {
      buildedUrl = new Path(url).build(idAttributeObject)
      queryParams = R.omit(idAttributes, params)
    }

    return fetch(`${API.namespace}${buildedUrl}?${param(queryParams)}`, {
      headers: R.merge({
        'Content-Type': 'application/json'
      }, headers)
    })
      .then(response => response.json())
      .then(json => normalize(camelizeKeys(json.data), IS_COLLECTION ? arrayOf(schema) : schema))
      .then(
        response => response,
        error => ({ error: error.message || 'Something bad happened' })
      )
  }),

  // :: String -> [String] -> (k: v) -> (a -> b)
  post: R.curry((url, idAttributes, params, schema, headers = {}) => {
    const idAttributeObject  = R.pick(idAttributes, params)
    const missingIdAttibutes = R.reject(
      R.flip(R.contains)(R.keys(idAttributeObject)), R.reject(R.equals(IS_COLLECTION), idAttributes)
    )
    const lastIdAttribute = R.last(idAttributes)
    let bodyParams
    let buildedUrl

    if (!R.isEmpty(missingIdAttibutes)) {
      throw new Error(`You must provide "${missingIdAttibutes}" in params`)
    }

    if (idAttributes.length === 1 && lastIdAttribute === IS_COLLECTION) {
      bodyParams = params
      buildedUrl = url
    }

    if (idAttributes.length > 1 || lastIdAttribute !== IS_COLLECTION) {
      bodyParams = R.omit(idAttributes, params)
      buildedUrl = new Path(url).build(idAttributeObject)
    }

    return fetch(`${API.namespace}${buildedUrl}`, {
      method:  'POST',
      body:    JSON.stringify(bodyParams),
      headers: R.merge({
        'Content-Type': 'application/json'
      }, headers)
    })
      .then(response => response.json())
      .then(json => normalize(camelizeKeys(json), schema))
      .then(
        response => response,
        error => ({ error: error.message || 'Something bad happened' })
      )
  }),

  // :: String -> [String] -> (k: v) -> (a -> b)
  patch: R.curry((url, idAttributes, params, schema, headers = {}) => {
    const idAttributeObject  = R.pick(idAttributes, params)
    const missingIdAttibutes = R.reject(
      R.flip(R.contains)(R.keys(idAttributeObject)), R.reject(R.equals(IS_COLLECTION), idAttributes)
    )
    const lastIdAttribute    = R.last(idAttributes)
    let bodyParams
    let buildedUrl

    if (!R.isEmpty(missingIdAttibutes)) {
      throw new Error(`You must provide "${missingIdAttibutes}" in params`)
    }

    if (idAttributes.length === 1 && lastIdAttribute === IS_COLLECTION) {
      bodyParams = params
      buildedUrl = url
    }

    if (idAttributes.length > 1 || lastIdAttribute !== IS_COLLECTION) {
      bodyParams = R.omit(idAttributes, params)
      buildedUrl = new Path(url).build(idAttributeObject)
    }

    return fetch(`${API.namespace}${buildedUrl}`, {
      method:  'PATCH',
      body:    JSON.stringify(bodyParams),
      headers: R.merge({
        'Content-Type': 'application/json'
      }, headers)
    })
      .then(response => response.json())
      .then(json => normalize(camelizeKeys(json), schema))
      .then(
        response => response,
        error => ({ error: error.message || 'Something bad happened' })
      )
  }),

  // :: String -> [String] -> (k: v) -> (a -> b)
  delete: R.curry((url, idAttributes, params, headers = {}) => {
    const idAttributeObject  = R.pick(idAttributes, params)
    const missingIdAttibutes = R.reject(
      R.flip(R.contains)(R.keys(idAttributeObject)), R.reject(R.equals(IS_COLLECTION), idAttributes)
    )
    const lastIdAttribute    = R.last(idAttributes)
    let buildedUrl

    if (!R.isEmpty(missingIdAttibutes)) {
      throw new Error(`You must provide "${missingIdAttibutes}" in params`)
    }

    if (idAttributes.length === 1 && lastIdAttribute === IS_COLLECTION) {
      buildedUrl = url
    }

    if (idAttributes.length > 1 || lastIdAttribute !== IS_COLLECTION) {
      buildedUrl = new Path(url).build(idAttributeObject)
    }

    return fetch(`${API.namespace}${buildedUrl}`, {
      method:  'DELETE',
      headers: R.merge({
        'Content-Type': 'application/json'
      }, headers)
    })
      .then(response => response.json())
      .then(json => camelizeKeys(json))
      .then(
        response => response,
        error => ({ error: error.message || 'Something bad happened' })
      )
  })
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// endpoint :: String -> (k: v) -> [(k: v)] -> (k: v)
export function endpoint(name, options = {}, nonRestfulRoutes = []) {
  const idAttribute            = options.idAttribute || 'id'
  const nestedEndpoint         = options.nestUnder
  const namespace              = options.namespace
  const nestedIdAttributes     = nestedEndpoint ? nestedEndpoint.idAttributes : []
  const nestedNamespacedIdAttributes = nestedEndpoint ? nestedEndpoint.namespacedIdAttributes : []
  const namespacedName = namespace !== undefined ? `${namespace}/${name}` : `${name}`
  let urls

  if (nestedEndpoint !== undefined && nestedEndpoint !== null) {
    urls = {
      collection: `${nestedEndpoint.collectionUrl}/:${R.last(nestedNamespacedIdAttributes)}/${namespacedName}`,
      member:     `${nestedEndpoint.collectionUrl}/:${R.last(nestedNamespacedIdAttributes)}/${namespacedName}/:${idAttribute}`
    }
  } else {
    urls = {
      collection: `/${namespacedName}`,
      member:     `/${namespacedName}/:${idAttribute}`
    }
  }

  const collectionUrl = urls.collection
  const memberUrl     = urls.member
  const namespacedIdAttribute = R.concat(pluralize(name, 1))(capitalize(idAttribute))

  const nonRestful = nonRestfulRoutes.reduce((result, routeConfig) => {
    const url = R.concat(urls[routeConfig.on])(`/${routeConfig.name}`)
    result[routeConfig.name] = commonMethods[routeConfig.method](url)(R.flatten(
      [...nestedNamespacedIdAttributes, (routeConfig.on === 'collection' ? IS_COLLECTION : idAttribute)])
    )
    return result
  }, {})

  return R.merge({
    name,
    collectionUrl,
    memberUrl,
    idAttributes:           R.append(idAttribute, nestedIdAttributes),
    namespacedIdAttributes: R.append(namespacedIdAttribute, nestedNamespacedIdAttributes),
    getCollection:          commonMethods.get(collectionUrl)(
                              [...nestedNamespacedIdAttributes, IS_COLLECTION]
                            ),
    get:    commonMethods.get(memberUrl)([...nestedNamespacedIdAttributes, idAttribute]),
    create: commonMethods.post(collectionUrl)(
              [...nestedNamespacedIdAttributes, IS_COLLECTION]
            ),
    update:  commonMethods.patch(memberUrl)([...nestedNamespacedIdAttributes, idAttribute]),
    destroy: commonMethods.delete(memberUrl)([...nestedNamespacedIdAttributes, idAttribute])
  })(nonRestful)
}

/**
  endpoint(
    @param name : String - name of the endpoint in plural, which will be used in URL
    @param options : Object - config object which may receive the following options:
      'idAttribute'
      'nestUnder' - another Endpoint object
      'namespace'
  )
**/
