const path = require('path')
const { v4: uuidv4 } = require('uuid'); // v4: uuidv4   :  using v4 method and renaming to uuidv4
//uuidv4(); // ⇨ it returns something seems to '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const uploadFile = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    //use promise because they are things that can success or failed
    return new Promise((resolve, reject) => {
        //checking name of file
        if (!files.archivo) {
            res.status(400).json({ msj: 'There are not files in the request' });
            return;
        }

        const { archivo } = files
        const nameSplited = archivo.name.split('.')
        const extension = nameSplited[nameSplited.length - 1]

        //validate extension
        if (!validExtensions.includes(extension)) {

            return reject(`The extension "${extension}" is not valid. The following extension are valid: ${validExtensions}`)
        }

        //path
        //__dirname : in this case will be path of controller
        console.log('------------------- controller file', __dirname)

        const nameTemp = uuidv4() + '.' + extension
        const uploadPath = path.join(__dirname, '../uploads/', folder, nameTemp)
        //uploadPath = path.join( __dirname, '../uploads/', archivo.name ); //name : name of file

        //mv : method to move file
        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err)
            }

            //returning only the file name
            resolve(nameTemp)
        });
    })
}

module.exports = {
    uploadFile,
}

