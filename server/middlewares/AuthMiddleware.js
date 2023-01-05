/*
from Users.js
    const accessToken = sign(                                           
        { username: user.username, id: user.id }, 
            "importantsecret"
    );  
*/

// func verify to see if we are correct
const {verify} = require("jsonwebtoken"); 

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if(!accessToken) return res.json({error: "User not logged in!"})

    try{
        const validToken = verify(accessToken, "importantsecret"); //validToken - data without being hashed!
        req.user = validToken; //req.user stores information about user ID and Username

        if(validToken) {
            return next();
        }
    }catch(err){
        return res.json({error: err})
    }
};

module.exports = {validateToken};