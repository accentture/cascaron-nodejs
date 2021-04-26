
//unpack a function of express
const { Router } = require('express') 
const { check } = require('express-validator')


const { isRoleValid,
        checkExistsEmail,
        checkExistsUser } = require('../helpers/db-validators')


/* const{ validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')
const { validateAdminRole, hasRole } = require('../middlewares/validate-roles') */

const { validateFields, validateJWT, validateAdminRole, hasRole } = require('../middlewares') //it is not necessary to write index.js


const { usersGet, 
        usersPost, 
        usersPut, 
        usersDelete, 
        usersPatch } = require('../controllers/users.controller')

const router = Router()

router.get('/', usersGet )
router.post('/', [

    //error of middlwares will be collect to pass to controller
    check('name', 'The name is not obligatory').not().isEmpty(), //to check if it is empty 
    check('password', 'El password debe de ser mayor a 6 letras').isLength({min:6}),
    check('email', 'The email is not valid').isEmail().custom(checkExistsEmail), //using middlware to validate email
    //check('role', 'Is is not a valide role').isIn(['ADMIN_ROLE', 'USER_ROLE']), //isIn : to check if is contained in the array 
    check('role').custom( isRoleValid ), //role is equal to param of isRoleValid function, therefore only pass the function as reference
    validateFields //my custom middlware must not be executed as a function
], usersPost)

            //the param id is parsed by express
router.put('/:id', [
    check('id', 'It id is nod valid').isMongoId(), //to validate id of mongoDB
    check('id', 'It id is nod valid').custom(checkExistsUser),
    check('role').custom( isRoleValid ),
    validateFields
], usersPut) 
router.patch('/', usersPatch)
router.delete('/:id', [
    validateJWT,
    //validateAdminRole,
    hasRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'It id is nod valid').isMongoId(), //to validate id of mongoDB
    check('id', 'It id is nod valid').custom(checkExistsUser),
    validateFields,
    
], usersDelete)

module.exports = router