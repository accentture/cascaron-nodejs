const { Router } = require('express') 
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/validate-fields')

const { login } = require('../controllers/auth')

const router = Router()

router.post('/login', [
    check('email', 'The email is obligatory').isEmail(),
    check('password', 'The password is obligatory').not().isEmpty(),
    validateFields
], login )


module.exports = router