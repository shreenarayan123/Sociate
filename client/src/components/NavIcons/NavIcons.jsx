import React from "react";
import InfoCard from "../InfoCard/InfoCard";
import { UilCommentAltDots } from '@iconscout/react-unicons'
import { UilBell } from '@iconscout/react-unicons'
import { UilHome } from '@iconscout/react-unicons'
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';


const NavIcons = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className="navIcons">
      <Link to="../home">
      <UilHome  />
      </Link>
      <UilSetting onClick={open} style={{cursor:"pointer"}} />
     <UilBell/>
      <Link to="../chat">
        <UilCommentAltDots/>
      </Link>
      <Drawer position="right" opened={opened} onClose={close} >
        <InfoCard/>
      </Drawer>
    </div>
  );
};

export default NavIcons;
