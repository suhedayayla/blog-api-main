import { useEffect, useState } from "react"
import Header from "../../components/Header/Header"
import Posts from "../../components/Posts/Posts"
import "./home.css"
import axios from "axios"
import { useLocation } from "react-router-dom"

export default function Home () {
    const [posts,setPosts] = useState([])   // useStatein içinde boş array tanımladık, initial state olduğu için. çünkü henüz data fetchlemedik.
    const {search} = useLocation();

    useEffect (()=>{
        const fetchPosts = async () => {
            const res = await axios.get("/posts"+search)
            setPosts(res.data)
        }
        fetchPosts()

    }, [])                //useEffecttede [] boş array ekledik that means fire this useeffect at the beginning

    return (
            <>
            <Header/>
            <div className="home">
               <Posts posts={posts}/>
            
        </div>
        </>
        )
    
}
    
  