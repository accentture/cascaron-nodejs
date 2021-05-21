
const { response } = require("express");
const { uploadFile } = require('../helpers')

/* 
    --package to upload files: https://www.npmjs.com/package/express-fileupload 
    --in cases that it is necessary to work with exact version of package add @ to in the command: npm i express-fileupload@1.2.1
    --it is very usefull to see example in git repository of every package, for instance: in cases that it is necessary to work with exact version of package add @ to in the command: npm i express-fileupload@1.2.1, where is displayed good practices for npm    
*/

/* 
    --uuid allows to generate unique identifiers : https://www.npmjs.com/package/uuid
*/

const chargeFile = async (req, res = response) => {

    //checking if exists properties in the request
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({ msj: 'There are not files in the request' });
        return;
    }

    try {
        //const fileName = await uploadFile(req.files, ['txt', 'md'], 'textos')
        const fileName = await uploadFile(req.files, undefined, 'images') // undefined : to use array by default of uploadFile() method
        res.json({ fileName })
    } catch (msj) {
        res.status(400).json({ msj })
    }
}

module.exports = {
    chargeFile
}


