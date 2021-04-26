const { response } = require('express')

const validateAdminRole = (req, res = response, next ) => {

    if(!req.user){
        return res.status(500).json({
            msg:"It want to verify the role withour verify the token"
        })
    }

    const { role, name, email } = req.user

    if( role !== 'ADMIN_ROLE'){
        return res.status(401).json({ //401 : to authorized to make a specific action
            msg:`${ name } is not admin - he can not make it action`
        })
    }

    next()
}

                //to receive arguments as to receive argumsntes in middlewares
                //...roles : to get all arguments, it will convert in an array
const hasRole = ( ...roles ) => {

    return ( req, res = response, next ) => {
        if(!req.user){
            return res.status(500).json({
                msg:"It want to verify the role withour verify the token"
            })
        }

        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg:`The service need whatever of the next roles: ${roles}`
            })
        }

        next()
    }
}

module.exports = {
    validateAdminRole,
    hasRole
}






