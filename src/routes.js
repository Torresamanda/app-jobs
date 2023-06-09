const express = require('express')
const router = express.Router()

const JobsControllers = require('./controllers/JobsControllers')

router.get('/jobs', JobsControllers.fetchAll)
router.get('/job/:id', JobsControllers.fetchOne)
router.post('/job', JobsControllers.insertJob)
router.put('/job/:id', JobsControllers.editJob)
router.delete('/job/:id', JobsControllers.deleteJob)


module.exports = router