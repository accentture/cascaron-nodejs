const { Router } = require('express') 
const { check } = require('express-validator')
const { chargeFile } = require('../controllers/uploads')

const { validateFields } = require('../middlewares/validate-fields')

const router = Router()

router.post('/', chargeFile)

module.exports = router