import "./settings.css"
import { useContext, useState } from "react"
import { Context } from "../../context/Context"
import axios from "axios"


export default function Settings () {

    const [file,setFile] = useState(null)
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [success,setSuccess] = useState(false)

    const {user,dispatch} = useContext(Context);
    const PF = "http://localhost:5000/images/";
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updatedUser ={
            userId:user._id,
            username,
            email,
            password
        };
        if (file){   //eğer resim varsa   bunu kullanıyor
            const data = new FormData();
            const filename = Date.now()+file.name; //filenamei yüklendiği tarihe göre yazıyor
            data.append("name",filename); //önce filenamei sonra fileı ekliyoruz aşağıda
            data.append("file",file);

            updatedUser.profilePic = filename; // yukarıdaki newposta photoyu eklityoruz
            try{
                await axios.post("/upload",data); //upload urlinde(api/indexte bulunan /upload urli) bu datayı yani imagei ekliyoruz.
            }catch(err){}
        } 
        try{
            const res = await axios.put("/users/"+user._id,updatedUser); //posts urline newPostumuzu gönderiyoruz.
            setSuccess(true)
            dispatch({ type: "UPDATE_SUCCESS", payload:res.data});


        }catch(err){}
         dispatch({ type: "UPDATE_FAILURE" });

    };


    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Hesabınızı Güncelleyin</span>
                    <span className="settingsDeleteTitle">Hesabınızı Silin</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profil Fotoğrafı</label>
                    <div className="settingsPP">
                        <img src={ file ? URL.createObjectURL(file) : PF+user.profilePic}
                        alt=""/>
                        <label htmlFor="fileInput">
                        <i className="settingsPPIcon fa-regular fa-circle-user"></i>
                        </label>
                        <input type="file" id="fileInput" style={{display:"none"}}
                             onChange={(e)=>setFile(e.target.files[0])}/>
                    </div>
                    <label>Kullanıcı Adı</label>
                    <input type="text" placeholder={user.username}
                      onChange={e=>setUsername(e.target.value)} />
                    <label>Email</label>
                    <input type="email" placeholder={user.email} onChange={e=>setEmail(e.target.value)}/>
                    <label>Parola</label>
                    <input type="password" onChange={e=>setPassword(e.target.value)}/>
                    <button className="settingsSubmit" type="submit">Güncelle</button>
                    {success && <span style={{color:"green", textAlign:"center", margin:"20px"}}>Profil güncellendi.</span>}
                </form>
            </div>

              </div>
        )
    
}
    