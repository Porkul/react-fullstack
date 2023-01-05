//Create a "Posts" Table, with columns required: title, postText, username.
module.exports = (sequelize, DataTypes) => {

    const Likes = sequelize.define("Likes");

    return Likes; 
};