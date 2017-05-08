var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var server = express()
var port = 3000

// Parses the request data into json
// gives access to `req.body`
server.use(bodyParser.json())


server.get('/', function(req, res, next){
  res.send(200, "Hello I hear you....")
})

server.get('/banana', function(req, res, next){

  res.send('<img src="https://media.mercola.com/assets/images/foodfacts/banana-og.jpg" height="200"/>')

})

var people = [{
  name: 'Luke Skywalker'
}, {
  name: 'Obi-Wan Konobi'
}]

server.get('/people', function(req, res, next){
  res.send(people)
})

server.get('/people/:id', function(req, res, next){
  var id = req.params.id
  console.log(id)
  if(people[id]){
    res.send(people[id])
  }else{
    res.send(404, {
      error: {
        message: "Sorry no person at id" + id
      }
    })
  }
})


server.post('/people', function(req, res, next){

  var newPerson = req.body.person
  var secret = req.body.secret

  if(newPerson.name && secret == "these are not the droids you are looking for"){
    people.push(newPerson)
    res.send('Okay')
  }else{
    res.send(401, 'sorry you must have a name to add a person')
  }
})







server.listen(port, function(){
  console.log("The server is working and listening for request on port: ", port)
})

