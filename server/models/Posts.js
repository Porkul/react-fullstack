//Create a "Posts" Table, with columns required: title, postText, username.
module.exports = (sequelize, DataTypes) => {

    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });


    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade", // if we delete post, auto. delete all comments created to that post
        });
    }

    Posts.associate = (models) => {
        Posts.hasMany(models.Likes, {
            onDelete: "cascade", 
        });
    }

    return Posts; 
};
