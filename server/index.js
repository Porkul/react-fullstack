const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json()); // to check requests with postman

const db = require('./models');
app.use(cors());

// Routers
const postRouter = require('./routes/Posts');
app.use("/posts", postRouter);

const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const likesRouter = require("./routes/Likes");
app.use("/like", likesRouter);

db.sequelize.sync().then(() =>{
    app.listen(3001, () =>{
        console.log("Server is running on port 3001");
    });
})
// Whenever we start our API we want ant the same time go over tables existing in models folder, check if they exist in DB. If not- create a table.
