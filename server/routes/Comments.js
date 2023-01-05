const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');
const { route } = require('./Users');


router.post("/", validateToken,  async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username; //adding field username to comment object that equals validToken.username
    await Comments.create(comment);
    res.json(comment);
  });

  router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;   
    //telling seqielize "SELECT * FROM  Comments WHERE PostId = ${postId}"                
    let comments = await Comments.findAll( {where: { PostId: postId } });
    res.json(comments);
});

  //we wont allow to delete comment if the user is not the owner of this comment
  router.delete("/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId;

    await Comments.destroy({
      where: {
        id: commentId,
      },
    });

    //we making req and it is going on forever, we have to return smth
    res.json("DELETED SUCCESSFULLY")
  });

module.exports = router;