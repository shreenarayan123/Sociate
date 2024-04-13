import React from "react";

import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import { UilCommentAltDots } from '@iconscout/react-unicons'
import { UilBell } from '@iconscout/react-unicons'
import Comment from "../../img/comment.png";
import { UilHome } from '@iconscout/react-unicons'
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

const NavIcons = () => {
  return (
    <div className="navIcons">
      <Link to="../home">
      <UilHome  />
      </Link>
      <UilSetting />
     <UilBell/>
      <Link to="../chat">
        <UilCommentAltDots/>
      </Link>
    </div>
  );
};

export default NavIcons;
