
const path = require('path') //owner of node.js
const fs = require('fs') //owner of node.js

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL ) //config cloudinary

const { response } = require("express");
const { uploadFile } = require('../helpers')
const { User, Product } = require('../models')


/* 
    --package to upload files: https://www.npmjs.com/package/express-fileupload 
    --in cases that it is necessary to work with exact version of package add @ to in the command: npm i express-fileupload@1.2.1
    --it is very usefull to see example in git repository of every package, for instance: in cases that it is necessary to work with exact version of package add @ to in the command: npm i express-fileupload@1.2.1, where is displayed good practices for npm    
*/

/* 
    --uuid allows to generate unique identifiers : https://www.npmjs.com/package/uuid
*/

const chargeFile = async (req, res = response ) => {

    try {
        //const fileName = await uploadFile(req.files, ['txt', 'md'], 'textos')
        const fileName = await uploadFile(req.files, undefined, 'images') // undefined : to use array by default of uploadFile() method
        res.json({ fileName })
    } catch (msj) {
        res.status(400).json({ msj })
    }
}

const updateImage = async (req, res = response ) => {

    const { collection, id } = req.params
    let model

    switch (collection) {
        case 'users':
            model = await User.findById(id)

            if (!model) {
                return res.status(400).json({
                    msg: `Does not exist an user with id ${id} `
                })
            }
        break;
        case 'products':
            model = await Product.findById(id)

            if (!model) {
                return res.status(400).json({
                    msg: `Does not exist an product with id ${id} `
                })
            }
        break;
        default:

            return res.status(500).send({ msg: 'I forgot to validate this collection' })
    }
    
    //clean previous images
    if( model.img ){
        const pathImage = path.join( __dirname, '../uploads', collection, model.img )
        if( fs.existsSync( pathImage ) ){ //checking if exists image
            fs.unlinkSync( pathImage ) //delete file
        }
    }

    const name = await uploadFile(req.files, undefined, collection) 
    model.img = name

    await model.save()
    res.json( model )
}

const updateImageCloudinary = async (req, res = response ) => {

    const { collection, id } = req.params
    let model

    switch (collection) {
        case 'users':
            model = await User.findById(id)

            if (!model) {
                return res.status(400).json({
                    msg: `Does not exist an user with id ${id} `
                })
            }
        break;
        case 'products':
            model = await Product.findById(id)

            if (!model) {
                return res.status(400).json({
                    msg: `Does not exist an product with id ${id} `
                })
            }
        break;
        default:

            return res.status(500).send({ msg: 'I forgot to validate this collection' })
    }
    
    //clean previous images
    if( model.img ){

    }

    console.log(req.files.archivo) 

    const { tempFilePath } = req.files.archivo //temporal path own of cloudinary 
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath) //upload() return a promise

    model.img = secure_url

    await model.save()
    res.json( model )
}

const displayImage = async ( req, res = response ) => {
    const { collection, id } = req.params
    let model

    switch (collection) {
        case 'users':
            model = await User.findById(id)

            if (!model) {
                return res.status(400).json({
                    msg: `Does not exist an user with id ${id} `
                })
            }
        break;
        case 'products':
            model = await Product.findById(id)

            if (!model) {
                return res.status(400).json({
                    msg: `Does not exist an product with id ${id} `
                })
            }
        break;
        default:

            return res.status(500).send({ msg: 'I forgot to validate this collection' })
    }
    
    //clean previous images
    if( model.img ){
        const pathImage = path.join( __dirname, '../uploads', collection, model.img )
        if( fs.existsSync( pathImage ) ){ //checking if exists image
            return res.sendFile( pathImage )
        }
    }
    const notFoundImage = path.join( __dirname, '../assets/no-image.jpg' )
    console.log('-----------------not found', notFoundImage)
    return res.sendFile( notFoundImage )
    //res.json({msg:'The imagen does not exist'})

    //it is very usefull to upload files in another server to protect all code
}

module.exports = {
    chargeFile,
    updateImage,
    updateImageCloudinary,
    displayImage
}


