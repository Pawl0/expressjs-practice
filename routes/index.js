const express = require('express')
const router = express.Router()

const profiles = {
    sjobs: {
        image: '/images/sjobs.jpg',
        name: 'steve jobs',
        username: 'sjobs',
        company: 'apple',
        languages: ['objective-c', 'switft', 'c++']
    },
    bgates: {
        image: '/images/bgates.jpg',
        name: 'bill gates',
        username: 'bgates',
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
    res.redirect('/home')
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
    const username = req.params.username
    const currentProfile = profiles[username]

    if (currentProfile == null) {
        res.json({
            confirmation: 'fail',
            message: 'Profile ' + username + ' not found'
        })

        return
    }

    currentProfile.timestamp = req.timestamp

    // template and data being rendered
    res.render('profile', currentProfile)
  })

  // show saved profiles
  router.get('/profiles', (req, res) => {

    const keys = Object.keys(profiles)

    const list = []

    keys.forEach(key => {
        list.push(profiles[key])
    })

    const data = {
        profiles: list,
        timestamp: req.timestamp
    }
    // template and data being rendered
    res.render('profiles', data)
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