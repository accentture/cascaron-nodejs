const { Router } = require('express') 
const { check } = require('express-validator')

const { validateJWT, validateFields, validateAdminRole } = require('../middlewares')

const { createCategory,  
        getCategory, 
        getCategories, 
        updateCategory, 
        deleteCategory } = require('../controllers/categories.controller')

const { checkExistsCategory } = require('../helpers/db-validators')

const router = Router()
//public
router.get('/', getCategories),


//public
router.get('/:id', [
    check('id', 'This id is not valid').isMongoId(),
    check('id').custom( checkExistsCategory ),
    validateFields
], getCategory)


//whatever user iwth valid token    
router.post('/', [
    validateJWT,
    check('name', 'Name of category is required').not().isEmpty(),
    validateFields
], createCategory )

//valid token
router.put('/:id', [
    validateJWT,
    check('id', 'This id is not valid').isMongoId(),
    check('id').custom( checkExistsCategory ),
    check('name', 'Category name is required').not().isEmpty(),
    validateFields
    
], updateCategory)
 
//ADMIN_ROL
router.delete('/:id', [
    validateJWT,
    validateAdminRole,
    check('id', 'This id is not valid').isMongoId(),
    validateFields, //it is possible to to use 2 validateFields
    check('id').custom( checkExistsCategory ),
    validateFields
], deleteCategory)


module.exports = router