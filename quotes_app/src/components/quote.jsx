import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import CopyExample from "./CopyBoard";
const Quote = ({ data }) => {
  const { quotes, isFetching } = data;

  return (
    <div>
      {quotes.map((quote) => (
        <div key={quote.id} className="quote">
          <div className="quoteText">{quote.quoteText}</div>
          <div className="copybtn">
            <CopyExample quote={quote.quoteText} />
          </div>
          <Link className="author" to={quote.authorLink}>
            <span>- {quote.author}</span>
          </Link>
        </div>
      ))}
      <p>{isFetching ? "Fetching users..." : ""}</p>
    </div>
  );
};

export default Quote;
