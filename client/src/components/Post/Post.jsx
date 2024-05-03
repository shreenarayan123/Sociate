import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import axios from "axios";
import { likePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";
import {format} from 'timeago.js';
import { UilEllipsisH } from '@iconscout/react-unicons'
import { useNavigate, useNavigationType } from "react-router-dom";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [isMoreVisible, setIsMoreVisible] = useState(false);

  const handlemore = () => {
      setIsMoreVisible(!isMoreVisible); // Toggle the visibility state
  };
  const handleDelete =async()=>{
    const id = data._id;
    const userid =user._id; 

   const res = await  axios.delete(`http://localhost:5000/posts/${id}`,{
      headers:{
        'Authorization':`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
        },
        data:{
          userId:userid
        }
    }
  )
  window.location.reload();
      }
  const handleLike = () => {
    
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };
  return (
    <div className="Post">
      <div className="post-head">
      <div className="user-details">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt="Profile"
      />
      <span  style={{color:"black"  , fontWeight:"bold"}}  >{user.firstname}</span>
      <span  style={{color:"gray"}}  >@{user.username}</span>
      <span style={{background:"gray", height:"0.3rem" ,width:"0.3rem" ,borderRadius:"50%"}} ></span>
      <span  style={{color:"gray"}}  >{format(data.createdAt)}</span>
      </div>
      <div style={{ position: "relative" }}>
            <span className="more" onClick={handlemore} style={{cursor:"pointer",position: "absolute", bottom: "0.7rem", right:"-0.1rem" }}  ><UilEllipsisH/> </span>
            {isMoreVisible && (
                
                  <span className="post-more"  onClick={handleDelete} style={{ cursor:"pointer", fontSize:"1rem",fontWeight:"bold", borderRadius: "0.7rem",  color:"black",display:"flex",alignItems:"center", justifyContent:"center", background: "white", height: "2.7rem", width: "4rem", position: "absolute", bottom: "2rem", right:"0.5rem" ,boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)" }} >delete</span>
               
            )}
        </div>
      </div>
      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>
      
      <div className="postImage">
      <img 
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />
      
      </div>

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
     
    </div>
  );
};

export default Post;
