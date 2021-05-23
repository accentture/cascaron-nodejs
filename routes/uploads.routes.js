const { Router } = require('express') 
const { check } = require('express-validator')
const { chargeFile, updateImage, displayImage, updateImageCloudinary } = require('../controllers/uploads.controller')

const { validateFields, validateFile } = require('../middlewares')
const { allowedCollections } = require('../helpers/db-validators')

const router = Router()

router.post('/', validateFile, chargeFile)

router.put('/:collection/:id', [
    validateFile,
    check('id', 'This id must be from mongoDB').isMongoId(),
    check('collection').custom( c => allowedCollections(c, ['users', 'products'])),
    validateFields
], updateImageCloudinary)
//], updateImage)

router.get('/:collection/:id', [
    check('id', 'This id must be from mongoDB').isMongoId(),
    check('collection').custom( c => allowedCollections(c, ['users', 'products'])),
    validateFields
], displayImage)

module.exports = router