const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { validateToken } = require('../middlewares/AuthMiddleware');

const {sign} = require('jsonwebtoken');

router.post("/", async (req, res) => {           
    const { username, password } = req.body;     
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        })
    });
    res.json("success");
 });
 
 router.post("/login", async (req, res) => {           
    const { username, password } = req.body;   
    //grap user from db
    const user = await Users.findOne({ where : {username: username } });
    if(!user) res.json({error: "User Does not Exist"}); //check username

    bcrypt.compare(password, user.password).then((match) => {
        if(!match) res.json ({error: "Wrong Username or Password Combination"}); //check password

        const accessToken = sign(                                           
            { username: user.username, id: user.id }, 
             "importantsecret"
        );      

        // if fine give the user object accessToken with hashed data (username, id)
        
        res.json({token: accessToken, username: username, id: user.id});
    });
 });

 //prevent fake token
 router.get("/auth", validateToken, (req, res) => {
    res.json(req.user);
  });

router.get("/basicinfo/:id", async (req, res) => {
    const id = req.params.id;
  
    const basicInfo = await Users.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
  
    res.json(basicInfo);
});

  
module.exports = router;