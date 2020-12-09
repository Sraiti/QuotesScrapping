import "../App.css";
import Quote from "./quote";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../utils/pagination";
function Quotes() {
  const [data, setData] = useState({ quotes: [], isFetching: false });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setData({ quotes: data.quotes, isFetching: true });
        const response = await axios.get("/api/" + page);
        setData({ quotes: response.data, isFetching: false });
      } catch (e) {
        console.log(e);
        setData({ users: data.quotes, isFetching: false });
      }
    };
    fetchUsers();
  }, [page]);

  const handelPagination = (page) => {
    setPage((oldpage) => (oldpage = page));
  };

  return (
    <div className="grid-container">
      <main>
        {data.quotes.length > 0 ? (
          <Quote data={data} />
        ) : (
          <p> "Fetching users..." : ""</p>
        )}
      </main>
      <footer>
        <Pagination onPageChanged={handelPagination} currentPage={page} />
      </footer>
    </div>
  );
}

export default Quotes;
