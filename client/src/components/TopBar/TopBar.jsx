import { Link } from "react-router-dom";
import "./topbar.css"
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { useHistory } from "react-router-dom";
import axios from "axios";
import doa_logo_black from "../Logo/doa_logo_black.png";

export default function TopBar () {
    const {user, dispatch}= useContext(Context);
    const PF = "http://localhost:5000/images/";
    const [searchTerm, setSearchTerm] = useState("");
    const history = useHistory();



    const handleLogout =() =>{
        dispatch({type:"LOGOUT"})
    }

    const handleSearch = async () => {
        try {
          const response = await axios.get(`/posts/search/`+ searchTerm);
          history.push(`/search/${searchTerm}`, { posts: response.data, searchTerm });
        } catch (err) {
          console.error("Search error:", err);
        }
      };

      const handleEnterPress = (e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      };
      
    return (
    <div className="top">
        <div className="topLeft">
        <ul className="topList">
            <li className="topListItem"> 
            <Link className="link" to="/">
               <img src={doa_logo_black} alt="Logo" className="logo" />
            </Link>
            </li>
            </ul>
       </div>
       
       
        <div className="topCenter">
        <ul className="topList">
             <li className="topListItem">
                <Link className="link" to="/write">
                    <div className="linkContent">
                    <i className="fa-solid fa-plus icon"></i>
                     <span>Tarif Ekle</span>
                     </div>
               </Link>
                </li>
        
     <li className="topListItem">          
        <input className="searchIconInput"
                type="text"
                placeholder="Tarif ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleEnterPress} // Enter tuşuna basıldığında handleEnterPress fonksiyonunu çağır

      />
      <i className="topSearchIcon fa-solid fa-magnifying-glass"
                onClick={handleSearch}>
                    </i> 
      </li>                  
      </ul>
        </div>

        <div className="topRight">
  
        <li className="topListItem" style={{ listStyleType: 'none' }} onClick={handleLogout}>
                {user && "Çıkış Yap"}</li>
                
            {user?(
                <Link to="/settings">
                <img className="topImg"
                src={PF + user.profilePic}
                alt=""/>
                </Link>
            ) : (
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to="/login">Giriş Yap</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/register">Kayıt Ol</Link>
                    </li>
                </ul>
            )}
   
       <a className="link" href="https://www.instagram.com/doamutfak/"
         target="_blank" rel="noopener noreferrer">
             <i className="topIcon fa-brands fa-square-instagram"></i>
</a>  
           </div>

    </div>
    )
}


