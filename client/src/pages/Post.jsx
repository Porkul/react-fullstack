import React, {useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

function Post() {
  let { id } = useParams(); //gets ID from url

  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const {authState} = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    //For now we have complete the logic of router.get("/byId/:id"...) in server/routes/Posts.js
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
  });
  }, []);

  const addComment = () => {
    axios
      .post("http://localhost:3001/comments", {
        commentBody: newComment,
        PostId: id,
      }, 
      { // config obj
        headers: {
          accessToken: localStorage.getItem("accessToken")
        }
      }
      )
      .then((response) => {
        if(response.data.error){
          console.log(response.data.error)
        }else{
          //set previous list of comment + add new comment
          const commentToAdd = {commentBody: newComment, username: response.data.username}
          setComments([...comments, commentToAdd ]);
          setNewComment("");
        }
      });
  };
  
  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((value) => {
            return value.id != id; //loop and keep only if id doesnt == id we delete
          })
        );
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate("/");
      });
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {postObject.title} </div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">
            {postObject.username}
            {authState.username === postObject.username &&  (<button onClick={()=>{deletePost(postObject.id)}}>Delete</button>)}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className='addCommentContainer'>
          <input type="text" placeholder='Comment...' value={newComment} onChange={(event) => {setNewComment(event.target.value)}}/>
          <button onClick={addComment}> Add Comment </button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <label> Username:{comment.username}</label>
                {authState.username == comment.username &&  <button onClick={() => {deleteComment(comment.id)}}> X </button> }
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post