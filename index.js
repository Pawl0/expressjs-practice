const express = require('express')
const app = express()
const path = require('path')
const hoganMiddleware = require('hogan-middleware')
const port = 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'mustache')
app.engine('mustache', hoganMiddleware.__express)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
    res.send('Teste!')
  })

app.get('/json', (req, res) => {
    const data = {
        key1: "value1",
        key2: "value2",
        key3: "value3",
    }
    res.json(data);
})

app.get('/home', (req, res, next) => {
    res.render('home', null)
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})