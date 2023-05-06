const express = require('express')
const router = express.Router()

const JobsControllers = require('./controllers/JobsControllers')

router.get('/jobs', JobsControllers.fetchAll)
router.get('/job/:id', JobsControllers.fetchOne)
router.post('/job', JobsControllers.insert)
router.put('/job/:id', JobsControllers.alter)
router.delete('/job/:id', JobsControllers.delete)


module.exports = router