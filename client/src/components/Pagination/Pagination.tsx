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

            <ul className="pagination">
                <li className={page === 1 ? "disabled" : ""}>
                    <a href="#" onClick={prevPage} >
                        Anterior
                    </a>
                </li>

                {pageNumbers.map((p) => (
                <li key={p} className={p === page ? "active" : ""}>
                    <a
                    href="#"
                    onClick={ () => setPage(p)}
                    aria-current={p === page ? "page" : undefined}
                    >
                    {p}
                    </a>
                </li>
                ))}

                <li className={page === totalPages ? "disabled" : ""}>
                    <a href="#" onClick={nextPage} >
                        Siguiente
                    </a>
                </li>
            </ul>
        </div>
    );
};