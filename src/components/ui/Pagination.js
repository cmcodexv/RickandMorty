//helper
import createPagination from "./helpers/CreatePagination";

const Pagination = ({
  currentPage,
  handleClick,
  numberOfCharacters,
  charactersPerPage,
}) => {
  const { pagination } = createPagination({
    numberOfCharacters: numberOfCharacters,
    charactersPerPage: charactersPerPage,
    numberOfButtons: 8,
    currentPage,
  });

  return (
    <div className="pagination">
      <ul>
        <li
          className={`${pagination[0] === currentPage && "disabled"}`}
          onClick={handleClick.bind(null, currentPage - 1)}
        >
          Prev
        </li>
        {pagination.map((page) => (
          <li
            key={page}
            className={`${currentPage === page && "active"}`}
            onClick={handleClick.bind(null, page)}
          >
            {page}
          </li>
        ))}
        <li
          className={`${pagination.reverse()[0] === currentPage && "disabled"}`}
          onClick={handleClick.bind(null, currentPage + 1)}
        >
          Next
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
