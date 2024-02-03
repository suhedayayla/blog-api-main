/*import "./sidebar.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function SideBar () {
    const [cats,setCats ]= useState([]);

    useEffect (()=>{
        const getCats = async () => {
            const res = await axios.get("/categories")
            setCats(res.data)
        }
        getCats()

    }, [])   //baslangıcta direkt çalıştırcağımız için empty array yazdık.

    return (
        
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">Hakkımda</span>
                <img 
                    src="http://www.lauragargiulo.com/wp-content/uploads/2015/03/post3.jpg"
                    alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus labore exercitationem ab deleniti esse totam ut hic magni officiis ipsa cupiditate laborum tempora, veniam</p>
            </div>
            <div className="sidebarItem">
              <span className="sidebarTitle">Kategoriler</span>
                <ul className="sidebarList">
                   {cats.map((c)=>(
                    <Link to={`/?cat=${c.name}`} className="link">
                      <li key={c._id} className="sidebarListItem">{c.name}</li>
                      </Link>
                   ))}

                </ul>
            </div>
            <div className="sidebarItem">
              <span className="sidebarTitle">Bizi Takip Edin</span>
                <div className="sidebarSocial">
                     <i className="sidebarIcon fa-brands fa-square-facebook"></i>
                     <i className="sidebarIcon fa-brands fa-square-x-twitter"></i>
                     <i className="sidebarIcon fa-brands fa-square-instagram"></i>
       

                </div>
            </div>

        </div>
        )
    
}
    */