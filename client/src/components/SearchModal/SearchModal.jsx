import React,{useEffect, useState} from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import LogoSearch from "../LogoSearch/LogoSearch";
import { getAllUser } from "../../api/UserRequests";
import User from "../User/User";
import { useSelector } from "react-redux";



const SearchModal = ({ modalOpened,searchResults, setModalOpened }) => {
    const { user } = useSelector((state) => state.authReducer.authData);
    
    
  const theme = useMantineTheme();
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="60%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
       <div className="search-modal" style={{display:"flex", flexDirection:"column",alignItems:"center", gap:"1.5rem"}} >
       <div style={{width:"80%"}}>
       <LogoSearch  location='modal'/>
       </div>
    <div style={{width:"80%"}}>
    {searchResults.map((person, id) => {
      
        if ((person._id) !== (user._id)) return <User person={person} key={id} />;
      })}
    </div>
       </div>
      

    </Modal>
  );
};

export default SearchModal;
