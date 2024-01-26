const bodyParser = require ('body-parser')
const express = require ("express")
const path = require ('path')
const app = express()
const tokenManager = require ('./token-manager.js')
const queries = require ('./queries.js')
const cors = require('cors')
app.use(bodyParser.json())
app.use(cors())




app.get('/', (req, res) => {
    res.send("Hello!")
})

app.get('/users/:id', tokenManager.authenicateToken, queries.getUser)


app.post('/users', queries.createUser)


app.delete('/users/:id', tokenManager.authenicateToken, queries.deleteUser)


app.put('/users/:id', tokenManager.authenicateToken, queries.updateUser)


app.get('/events', queries.events)

app.get('/cuisineType', queries.cuisineType)

app.get('/menu',  queries.menu)

// app.post('/orderSubmit', )

// app.post('/orderConfirm', )



app.post('/login', queries.login)

app.listen(3000)
console.log("Express is running!")