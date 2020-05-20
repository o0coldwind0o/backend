// main file to define the API endpoints and their handler chains

'use strict'

const restify = require('restify')
const server = restify.createServer()
const googleapi = require('./modules/newsqueryHandlers')
const favourites = require('./modules/favouritesHandlers')
const authorization = require('./modules/authorizeHandlers')
const loging = require('./modules/loginHandlers')
const users = require('./modules/usersHandlers')
const corsMiddleware = require('restify-cors-middleware')

server.use(restify.fullResponse())
server.use(restify.queryParser())
server.use(restify.jsonBodyParser({ mapParams: true }));
server.use(restify.authorizationParser())
 
const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['https://o0coldwind0o.github.io/worldwidenewsclient/', 'localhost:4200'],
  allowHeaders: ['Authorization'],
  credentials:true,
  allowmethods:['GET', 'PUT', 'POST','DELETE','PATCH','OPTIONS'],
  exposeHeaders: ['Authorization']
})
server.pre(cors.preflight)
server.use(cors.actual)

server.get('/newsearch', googleapi.doNewSearch)
server.get('/login', authorization.authorize, loging.check)  // login valid user
server.get('/favourites', authorization.authorize, favourites.list)  // get a list of all favs
server.post('/favourites', authorization.authorize, favourites.validate, favourites.add)  // add a new fav
server.get('/favourites/:id', authorization.authorize, favourites.get)  // get details of a particular fav using id
// update details of existing fav using id
server.put('/favourites/:id', authorization.authorize, favourites.validate, favourites.update)  
server.del('/favourites/:id', authorization.authorize, favourites.delete)  // delete existing fav using id

server.post('/users', users.validateUser, users.add)  // add a new user to the DB (pending confirmation)
server.post('/users/confirm/:username', users.validateCode, users.confirm)  // confirm a pending user
server.del('/users/:username', authorization.authorize, users.delete)  // delete a user

const port = process.env.PORT || 8080

server.listen(port, err => console.log(err || `App running on port ${port}`))
