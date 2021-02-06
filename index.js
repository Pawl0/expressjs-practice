const express = require('express')
const app = express()
const path = require('path')
const hoganMiddleware = require('hogan-middleware')
const port = 3000
const bodyParser = require('body-parser')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'mustache')
app.engine('mustache', hoganMiddleware.__express)
app.use(express.static(path.join(__dirname, 'public')))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Middleware (every request is going to have a timestamp for example)
const timestamp = (req, res, next) => {
  const timestamp = new Date()
  req.timestamp = timestamp
  next()
}

app.use(timestamp)
//

// import routes
const indexRouter = require('./routes/index');
const register = require('./routes/register');

// use routes
app.use('/', indexRouter)
app.use('/register', register)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running at http://localhost:${port}`)
})