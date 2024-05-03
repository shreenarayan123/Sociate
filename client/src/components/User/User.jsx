import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { UilEllipsisH } from '@iconscout/react-unicons'
import { createChat } from "../../api/ChatRequests";
const User = ({ person }) => {
  console.log("person",person.username);
  // 
  const navigate = useNavigate()
  const [isChatVisible, setIsChatVisible] = useState(false);

    const handleChat = () => {
        setIsChatVisible(!isChatVisible); // Toggle the visibility state
    };
    
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch()
  
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleChatClick =async () => {
    
    try {
      await createChat({
        senderId:user._id,
        receiverId:person._id
        
      })
      navigate('/chat');
    } catch (error) {
      console.log(error);
    }

};
const redirectFollower = ()=>{
   navigate(`/profile/${person._id}`)
}
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };
    


  return (
    <div className="follower">
      <div>
        
        <img  style={{cursor:"pointer"}} onClick={redirectFollower}
          src={
            person.profilePicture
            ? serverPublic + person.profilePicture
            : serverPublic + "defaultProfile.png"
            
          }
          alt="profile"
          className="followerImage"
        />
        <div className="name">
          <span>{person.firstname}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
      <div style={{ position: "relative" }}>
            <span className="more" onClick={handleChat} style={{cursor:"pointer"}}  ><UilEllipsisH/> </span>
            {isChatVisible && (
                
                  <span className="chat"  onClick={handleChatClick} style={{ cursor:"pointer", fontSize:"1rem",fontWeight:"bold", borderRadius: "0.7rem",  color:"black",display:"flex",alignItems:"center", justifyContent:"center", background: "white", height: "3rem", width: "3rem", position: "absolute", bottom: "1.5rem", left:"-1.7rem" ,boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)" }} >chat</span>
               
            )}
        </div>
    </div>
  );
};

export default User;
