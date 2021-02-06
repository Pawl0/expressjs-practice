const express = require('express')
const router = express.Router()

const profiles = {
    dkwon: {
        name: 'dan kwon',
        company: 'self',
        languages: ['javascript', 'switft', 'python']
    },
    sjobs: {
        name: 'steve jobs',
        company: 'apple',
        languages: ['objective-c', 'switft', 'c++']
    },
    bgates: {
        name: 'bill gates',
        company: 'microsoft',
        languages: ['c', 'c#', 'java']
    }
}


router.post('/addprofile', (req, res) => {
    const { body } = req

    body['languages'] = body.languages.split(', ')

    profiles[body.username] = body
    res.redirect('/profile/'+body.username) // works but gives Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

    res.json({
        confirmation: 'success',
        data: body
    })
})

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
    const currentProfile = profiles[username]

    if (currentProfile == null) {
        res.json({
            confirmation: 'fail',
            message: 'Profile ' + username + ' not found'
        })

        return
    }

    // template and data being rendered
    res.render('profile', currentProfile)
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

//   router.post('/post', (req, res) => {

//     const body = req.body // normally comes from a POST form

//     console.log(body)

//     res.json({
//         confirmation:'success',
//         data: body
//     })
//   })
  
  module.exports = router