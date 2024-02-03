import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  const options= {day:'numeric', month:'numeric',year:'numeric'}
  return (
    <div className="post">
       
       <Link to={`/post/${post._id}`} className="link">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      </Link>
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toLocaleDateString('tr-TR',options)}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}