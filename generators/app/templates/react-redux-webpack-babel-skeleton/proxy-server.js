var path = require('path')
var http = require('http')
var express = require('express')
var httpProxy = require('http-proxy')

const app = express()
const proxy = httpProxy.createProxyServer({})

app.use(function(request, response) {
  proxy.web(request, response, { target:'http://localhost:3000' }, error => {})
})
.listen(5000, () => console.log("Listen..."))
