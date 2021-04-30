const { Router } = require('express') 
const { check } = require('express-validator')

const { validateJWT, validateFields, validateAdminRole } = require('../middlewares')

const { getProduct,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct } = require('../controllers/products.controller')

const { checkExistsCategory, 
        checkStateCategory,
        checkExistsProduct } = require('../helpers/db-validators')

const router = Router()

router.get('/:id', [
    check('id', 'This category is not valid').isMongoId(),
    check('id').custom( checkExistsProduct ),
    validateFields
], getProduct )
router.get('/', getProducts )

router.post('/:categoryId', [
    validateJWT,
    check('categoryId', 'This category is not valid').isMongoId(),
    check('categoryId').custom( checkExistsCategory ),
    check('categoryId').custom( checkStateCategory ),
    check('name', 'Name is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    validateFields

], createProduct )


router.put('/:id', [
    validateJWT, 
    validateAdminRole,
    check('id', 'This category is not valid').isMongoId(),
    check('id').custom( checkExistsProduct ),
    validateFields
], updateProduct )

router.delete('/:id', [
    validateJWT,
    validateAdminRole,
    check('id', 'This product is not valid').isMongoId(),
    check('id').custom( checkExistsProduct ),
    validateFields
], deleteProduct )


module.exports = router