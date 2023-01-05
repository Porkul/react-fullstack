1. Install necessary packages like
   npm i
   express -----> is useful for building web apps quickly on NodeJS.
   cors -----> Allows you to configure and manage an HTTP server to access resources from the same domain.
   mysql2 -----> To interact with MySQL while using NodeJS.
   nodemon -----> Monitor for any changes in our source code.
   sequelize sequelize-cli -----> Makes it easy to manage a SQL database.
   axios ----->
   react-router-dom ----->
   formik ----->
   yup ----->for form validation
   jsonwebtoken
   rfce - snippet for React.

const express = require('express')
const app = express()

const db = require('./models')

//Change on server/config/ settings to connect to your DB
db.sequelize.sync().then(() =>{
app.listen(3001, () =>{
console.log("Server is running on port 3001");
});
})
