import { Link } from "react-router-dom"
import "./register.css"
import { useState } from "react"
import axios from "axios"

export default function Register () {
const [username,setUsername] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [error,setError] = useState("")


const handleSubmit = async (e) =>{  //async cunku its just a fnction not useEffect
    e.preventDefault();       //preventDefault yazmazsak kaydete bastığımızda sayfa sadece yenilenir
    setError(false);
   
    try{
    const res = await axios.post("/auth/register", {
        username,
        email,
        password,
    }); 
    res.data && window.location.replace("/login");
}catch(err){
    setError(true)
}
};
    return (
        
        <div className="register">
            <span className="registerTitle">Kayıt Ol</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Kullanıcı Adı</label>
                <input type="text" 
                       className="registerInput" 
                       placeholder="Kullanıcı adınızı giriniz.."
                       onChange={e => setUsername(e.target.value)}/>
                <label>Email</label>
                <input type="text" 
                       className="registerInput" 
                       placeholder="E-mail adresinizi giriniz.."
                       onChange={e => setEmail(e.target.value)}/>
                <label>Parola</label>
                <input type="password" 
                       className="registerInput" 
                       placeholder="Parolanızı giriniz.."
                       onChange={e => setPassword(e.target.value)}/>
                <button className="registerButton">Kayıt Ol</button>
            </form>
                <button className="registerLoginButton" type="submit">
                <Link className="link "to="/login">Kaydol</Link> 

                </button>
                {error && <span style={{color:"red", marginTop:"10px"}}>Bir şeyler yanlış gitti!</span>}
          </div>
        )
    
}
    