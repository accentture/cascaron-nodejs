const { response } = require('express')

const { Product } = require('../models')

const getProduct = async ( req, res = response ) => {
    const { id } = req.params

    const product = await Product.findById(id)

    res.json({product})
}

const getProducts = async ( req, res = response ) => {
    const products = await Product.find()
    res.json(products)
}

const createProduct = async ( req, res = response ) => {
    const { categoryId } = req.params
    const { name, price, description } = req.body
    console.log(name, price, description)

    const productDB = await Product.findOne({name})

    if(productDB){
        return res.status(200).json({msg:`This product ${name} exists already`})
    }
    
    const data = { 
        name, 
        price:Number(price), 
        user:req.user._id,
        category:categoryId,
        description,
    }
    const product = new Product(data)
    await product.save()
    res.json({product})
}

const updateProduct = async ( req, res = response ) => {
    const { id } = req.params
    const { state, available, ...data } = req.body
    data.user = req.user._id

    const product = await Product.findByIdAndUpdate(id, data, {new:true})

    res.json({product})
}

const deleteProduct = async ( req, res = response ) => {
    const { id } = req.params

    const product = await Product.findByIdAndUpdate(id, {state:false}, {new:true})
    res.json({product})
}

module.exports = {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}
