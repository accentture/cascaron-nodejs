const { OAuth2Client } = require('google-auth-library');

//const client = new OAuth2Client(CLIENT_ID);
const client = new OAuth2Client(process.env.GOOGE_CLIENT_ID);

const googleVerify = async ( idToken = '' ) => {
  const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });

  const { 
    name, 
    email, 
    picture:img //renaming data destructured

} = ticket.getPayload();
  //const userid = payload['sub'];  deleted by proffesor
  // If request specified a G Suite domain:
  // const domain = payload['hd'];

  return { name, email, img }
}
//verify().catch(console.error);

module.exports = {
    googleVerify
}
