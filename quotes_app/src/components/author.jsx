import React, { useState, useEffect } from "react";
import axios from "axios";

function Author(props) {
  const [author, setAuthor] = useState({ data: [], isFetching: false });
  const authorId = props.match.params.author;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setAuthor({ data: author.data, isFetching: true });
        const response = await axios.get("/api/author" + authorId);
        setAuthor({ data: response.data, isFetching: false });
        console.log(author.data);
      } catch (e) {
        console.log(e);
        setAuthor({ data: author.data, isFetching: false });
      }
    };
    fetchUsers();
  }, [authorId]);
  return (
    <div>
      {console.log(author)}
      {author.data.map((author) => (
        <div className="authorCard">
          <div className="authorName">{author.authorName}</div>
          <div className="authorDetails">
            {author.authorBornDate + " - " + author.authorBornLocation}
          </div>
          <div className="authorDescription">{author.authorDescription}</div>
        </div>
      ))}

      <p>{author.isFetching ? "Fetching users..." : ""}</p>
    </div>
  );
}

export default Author;
