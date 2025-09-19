import './Pagination.css'

type PaginationProps = {
  page: number;
  total: number;
  limit: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
};

export const Pagination = ({
    page,
    total,
    limit,
    setPage,
    nextPage,
    prevPage,
    } : PaginationProps) => {
    const totalPages = Math.ceil(total / limit);

    if (totalPages === 0) return null;

    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, startPage + 4);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

    return (
        <div className="pagination-container">
        <button
            onClick={prevPage}
            disabled={page === 1}
            className="pagination-button"
        >
            Anterior
        </button>

        {pageNumbers.map((p) => (
            <button
            key={p}
            onClick={() => setPage(p)}
            className={`pagination-button ${
                p === page ? "active" : ""
            }`}
            >
            {p}
            </button>
        ))}

        <button
            onClick={nextPage}
            disabled={page === totalPages}
            className="pagination-button"
        >
            Siguiente
        </button>
        </div>
    );
};