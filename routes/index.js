const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.send('Hello from the routes folder!')
  })
  
  router.get('/test', (req, res) => {
      res.send('Teste!')
    })
  
  router.get('/json', (req, res) => {
      const data = {
          key1: "value1",
          key2: "value2",
          key3: "value3",
      }
      res.json(data);
  })
  
  router.get('/home', (req, res, next) => {
      res.render('home', null)
  })

  module.exports = router