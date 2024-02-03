import React from "react";
import { useLocation, match } from "react-router-dom";
import Posts from "../../components/Posts/Posts";
import "./search.css";

export default function SearchResults({ match }) {
  const location = useLocation();
  const { state } = location;
  const { searchTerm } = match.params;

  return (
    <div>
      <h2 className="searchWrite"> {`${decodeURIComponent(searchTerm)} için arama sonuçlarınız: `}</h2>
      <Posts posts={state.posts} />
    </div>
  );
}
