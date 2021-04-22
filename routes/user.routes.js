
//unpack a function of express
const { Router } = require('express') 
const { usersGet, usersPost, usersPut, usersDelete, usersPatch } = require('../controllers/users.controller')


const router = Router()

router.get('/', usersGet )
router.post('/', usersPost)
router.put('/:id', usersPut) //the param id is parsed by express
router.patch('/', usersPatch)
router.delete('/', usersDelete)

module.exports = router