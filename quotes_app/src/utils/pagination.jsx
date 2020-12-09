import _ from "lodash";
const Pagination = ({ onPageChanged, currentPage }) => {
  const pages = _.range(1, 11);

  return (
    <nav className="pagination">
      <ul>
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "active" : ""}
            onClick={() => onPageChanged(page)}
          >
            <a className={page === currentPage ? "active" : ""} href="page">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
