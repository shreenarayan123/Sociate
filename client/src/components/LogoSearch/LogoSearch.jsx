import React from "react";
import Logo from "../../img/logo.png";
import './LogoSearch.css'
import { UilSearch } from '@iconscout/react-unicons'
import SearchModal from "../SearchModal/SearchModal";
import { useState , useEffect} from "react";
import { useSelector } from "react-redux";
import { getAllUser } from "../../api/UserRequests";


const LogoSearch = ({location}) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
    const { user } = useSelector((state) => state.authReducer.authData);
  
    const handleSearch = (e) => {
      const query = e.target.value;
      setSearchQuery(query);
  };
  const showModal = ()=>{
    if(!location ){
      setModalOpened(true)
    } 
    
  }
    useEffect(() => {
      const fetchPersons = async () => {
        const { data } = await getAllUser();
        setPersons(data);
      };
      fetchPersons();
    }, []);
    useEffect(() => {
      // Filter usernames array based on the search query
      const results = persons.filter(user =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
  }, [searchQuery]); 
    
  return (
    <div className="LogoSearch">
      <img  className="logoimg" src={Logo} alt="" />
      <div className="Search">
          <input type="text" 
           value={searchQuery}
          onChange={handleSearch}
          onClick={showModal} placeholder="#Explore"/>
          <div className="s-icon"  >
                <UilSearch/>
          </div>
      </div>
      

      <SearchModal
        searchResults ={searchResults}
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />
    
    </div>
  );
};

export default LogoSearch;
