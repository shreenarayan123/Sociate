
import React, { useEffect, useState } from "react";
import "./BioCard.css";
import { UilBag } from '@iconscout/react-unicons'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilCommentInfo } from '@iconscout/react-unicons'
import * as UserApi from "../../api/UserRequests.js";

const BioCard = () => {
    const params = useParams();
  
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);


  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        console.log("fetching")
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        console.log(profileUser)
      }
    };
    fetchProfileUser();
  }, [user]);

 
  
  
   
  
    return (
      <div className="InfoCard">
        <div className="infoHead">
         About Me 
        </div>
  
        <div className="info">
          {/* */}
          <span>
            <UilCommentInfo  style={{fontSize:"1rem"}}/>
          </span>
          <span>{profileUser.about}</span>
        </div>
        <div className="info">
          <span>
            <UilLocationPoint  style={{fontSize:"1rem"}}/>
          </span>
          <span>{profileUser.livesIn}</span>
        </div>
        <div className="info">
          <span>
           <UilBag  style={{fontSize:"1rem"}}/>
          </span>
          <span>{profileUser.worksAt}</span>
        </div>
  
      </div>
    );
  
}

export default BioCard