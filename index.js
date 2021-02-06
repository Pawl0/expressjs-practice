const express = require('express')
const app = express()
const port = 3000

const retObj = {
    "key1": "value1",
    "key2": "value2",
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
    res.send('Teste!')
  })

app.get('/obj', (req, res) => {
    res.send(retObj);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})