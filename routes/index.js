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

  /*  This route redirects requests to Turbo360. */
router.get('/redirect', (req, res) => {
    res.redirect('https://www.turbo360.co/landing')
  })
  
  // Assign a variable via parameter
//   router.get('/:path', (req, res) => {
//     const path = req.params.path
  
//     res.json({
//       "data": path
//     })
//   })
  
  // Use 2 parameters
  router.get('/:profile/:username', (req, res) => {
    const profile = req.params.profile
    const username = req.params.username
  
    res.json({
      "profile": profile,
      "username": username,
    })
  })

  // Query example (/query?name=name&occupation=occupation)
  router.get('/query', (req, res) => {
    const name = req.query.name
    const occupation = req.query.occupation

    const data = {
        name: name,
        occupation
    }
    
    res.render('profile', data)
  })

  
  module.exports = router