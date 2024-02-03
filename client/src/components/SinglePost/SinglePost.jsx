import { useLocation } from "react-router-dom"
import "./singlePost.css"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context"
import ReactMarkdown from "react-markdown"; // react-markdown ekleyin


export default function SinglePost () {
    const location = useLocation() //bu pagein linkini locate ettik
    const path = location.pathname.split("/")[2]; //linkin pathnameinde bulunan /tan sonraki 2. elemanını almak istedik çünkü idmiz var orada
    const [post,setPost] = useState({})
    const PF = "http://localhost:5000/images/";
    const {user} = useContext(Context);
    const [title, setTitle] = useState("")
    const [desc,setDesc] = useState("")
    const [updateMode,setUpdateMode] = useState(false)



    useEffect(() =>{
        const getPost = async () => {  //postun linkine tıkladığımızda o idye ait postun gelmesi için yazdık
              const res = await axios.get("/posts/" + path);
              setPost(res.data);
              setTitle(res.data.title);
              setDesc(res.data.desc);          
        };
        getPost()   
    },[path]); //bu path değiştikçe bu useeffecti çalıştır.

    const handleDelete = async () =>{
        try{
        await axios.delete(`/posts/${post._id}`, 
        {
          data:{username:user.username},  //usernamei directly gönderemedik çünkü delete metodu. o yuzden data içine aldık
        })
        window.location.replace("/"); //delete edince anasayfaya döner

    }catch(err){}
    }

    const handleUpdate = async () => {
        try {
          await axios.put(`/posts/${post._id}`, {
            username: user.username,
            title,
            desc,
          });
          setUpdateMode(false)
        } catch (err) {}
      };

      

    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };

    return (
        <div className="singlePost">
           <div className="singlePostWrapper">
           <div class="imageContainer">

            {post.photo && (
            <img src={"http://localhost:5000/images/" + post.photo} alt="" className="singlePostImg" />
            )}
            </div>
            {updateMode ? (
                <input 
                    type="text" 
                    value={title} 
                    className="singlePostTitleInput" 
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                    />) :(
            
            <h1 className="singlePostTitle">
                {title}
                {post.username === user?.username && ( //posttaki username ile dbdeki username aynıysa edit ve delete butonunu görebiliyor
                <div className="singlePostEdit">
                    <i 
                    className="singlePostIcon fa-solid fa-pen-to-square" 
                    onClick={() => setUpdateMode (true)}></i>      
                    <i 
                    className="singlePostIcon fa-solid fa-trash" 
                    onClick={handleDelete}></i>
            </div>
            )}
            </h1>
            )}

            <div className="singlePostInfo">
                <span className="singlePostAuthor"> Yazar:
                <Link className="link" to ={`/?user=${post.username}`}> 
                    <b>{post.username}</b>
                    </Link>
                    </span>
                <span className="singlePostDate">
                     {new Date(post.createdAt).toLocaleDateString('tr-TR',options)} </span>

            </div>

            
                {updateMode?(
                     <textarea className="singlePostDescInput" 
                     value={desc}
                     onChange={(e) => setDesc(e.target.value)}
                     /> ):(
                <p className="singlePostDesc" style={{ whiteSpace: "pre-line" }}>
                    {desc}
                </p>
            )}
                {updateMode && (
                     <button className="singlePostButton" 
                     onClick={handleUpdate}>
                        Güncelle
          </button>
        )}
           </div>
              </div>
        );
    
}