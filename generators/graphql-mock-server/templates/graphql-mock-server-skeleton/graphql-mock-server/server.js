var graphql = require('graphql')
var express = require('express')
var serve = require('graphql-server-express')
var bodyParser = require('body-parser')
var cors = require('cors')
var morgan = require('morgan')

var UserType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: graphql.GraphQLString
    },
    name: {
      type: graphql.GraphQLString
    }
  }
})

var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      footer: {
        type: graphql.GraphQLString,
        resolve() {
          return 'footer'
        }
      },
      me: {
        type: UserType,
        resolve() {
          return { id: 1 }
        }
      },
      users: {
        type: new graphql.GraphQLList(UserType),
        resolve() {
          return [{ id: 1, name: 'Bob' }]
        }
      }
    }
  })
})

var PORT = 4000
var app = express()

app.use(morgan('combined'))
app.use(cors())
app.use('/graphql', bodyParser.json(), serve.graphqlExpress({ schema: schema }))
app.use('/graphiql', serve.graphiqlExpress({ endpointURL: '/graphql' }));
app.listen(PORT)
