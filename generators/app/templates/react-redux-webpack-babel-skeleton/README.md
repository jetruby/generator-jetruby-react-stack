Install dependencies

```sh
npm i
```

# Running in development env

Run in development mode

```sh
npm run dev
```

This runs Procfile with 2 webpack builds and a node server for SSR

If you want to run them independently you can type

```sh
npm run dev-build
```
for webpack build and

```sh
npm run dev-serve
```
for a node server.

# Running in production env

```sh
npm run production-build && npm run production
```

# Deployment

TODO

# Mock GraphQL server

In the directory `graphql-mock-server`

```sh
npm i
```

and then in project root directory start a mocking server by running

```sh
npm run graphql-mock-server
```
This should be used in case when the back-end server is unavailable. It won't be able to replace a full back-end, but at least you can continue your work with on the client without 500 error.
