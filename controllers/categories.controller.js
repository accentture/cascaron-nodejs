const { response } = require("express");
const { Category } = require( '../models');

const getCategory = async ( req, res= response ) => {
    
    const { id } = req.params
    const category = await Category.findById(id).populate('user', 'name')
    res.json({category})
} 


const getCategories = async ( req, res= response ) => {
    const { limit = 1, since = 0 } = req.query
    const query = {state:true}

    const [ total, categories ] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .limit(Number(limit))
            .skip(Number(since))
            .populate('user', 'name') //to get only the name
    ])

    /* const categories = await Category.find(query).populate('user') */

    res.status(201).json({total, categories})
}

const createCategory = async ( req, res = response ) => {

    const name = req.body.name.toUpperCase()
    const categoryDB = await Category.findOne({ name })

    if(categoryDB){
        return res.status(400).json({
            msg:`The category ${name} exists already`
        })
    }
    //generate data to save, it voids that frontend send state for instance
    const data = {
        name,
        user:req.user._id
    }

    const category = new Category(data)
    category.save()

    //status 201 : when register was added in database
    res.status(201).json(category)
    
}

const updateCategory = async ( req, res = response ) => {
    const { id } = req.params
    const { state, user, ...data } = req.body

    data.name = data.name.toUpperCase()
    data.user = req.user._id

    const category = await Category.findByIdAndUpdate(id, data, { new:true })
    res.status(200).json({category})
    
}

const deleteCategory = async ( req, res = response ) => {
    const { id } = req.params

    const category = await Category.findByIdAndUpdate(id, { state: false }, { new: true })

    res.json({category})
}


module.exports = {
    createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory
}
