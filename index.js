var express = require('express')
var bodyParser = require('body-parser')

var server = express()
var port = 3000


// Database Stuff
var mongoose = require('mongoose')
var connectionstring = 'mongodb://student:student@ds147900.mlab.com:47900/books'
var connection = mongoose.connection;
// DOES NOT CHANGE
mongoose.connect(connectionstring, {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
});

connection.on('error', function (err) {
  console.log('THERE WAS A CONNECTION PROBLEM', err)
})

connection.once('open', function () {
  console.log('We are now connected to the books database')
  server.listen(port, function () {
    console.log('YEP its working', 'http://localhost:' + port)
  })
})






// Parses the request data into json
// gives access to `req.body`
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))


server.get('/', function (req, res, next) {
  res.send(200, "Hello I hear you....")
})

server.get('/banana', function (req, res, next) {

  res.send('<img src="https://media.mercola.com/assets/images/foodfacts/banana-og.jpg" height="200"/>')

})

server.get('/people', function (req, res, next) {
  Person.find({}).then(function (people) {
    res.send(people)
  })
})

server.get('/people/search', function (req, res, next) {
  var query = req.query
  Person.find(query).then(function (people) {
    res.send(people)
  })
})

server.get('/people/:id', function (req, res, next) {
  var id = req.params.id
  Person.findById(id).then(function (person) {
    res.send(person)
  }).catch(function (e) {
    res.send(e)
  })
})



server.put('/people/:id', function (req, res, next) {
  var id = req.params.id
  var updatedPerson = req.body.person
  Person.findByIdAndUpdate(id, updatedPerson)
    .then(function () {
      res.send(updatedPerson)
    })


})

server.post('/people', function (req, res, next) {

  var newPerson = req.body.person

  Person.create(newPerson)
    .then(function (newlyCreatedPerson) {
      res.send(newlyCreatedPerson)
    })

})

// PERSON IN THE DATABASE
var Schema = mongoose.Schema
var PersonSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  hasHair: { type: Boolean, required: true, default: true },
  glasses: { type: String, default: 'none' }
})
var Person = mongoose.model('Person', PersonSchema)



