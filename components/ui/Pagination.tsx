export default function Pagination({ totalItems, totalPages, currentPage, onPageChange, onLimitChange, limit }: { totalItems: number, totalPages: number, currentPage: number, onPageChange: Function, onLimitChange: Function, limit: number }) {
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    }
    return (
        <div className="table-footer">
            <div className="table-row-selector">
                <p>Show</p>
                <select onChange={(e) => onLimitChange(e.target.value)}>
                    <option value={10}>10</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
                entries
            </div>
            <div className="table-pagination">
                <button className="table-pagination-button" onClick={() => handlePageChange(1)}>&laquo;</button>
                <button className="table-pagination-button" onClick={() => handlePageChange(currentPage - 1)}>&lsaquo;</button>
                {
                    (currentPage > 3) && <button className="table-pagination-button" >...</button>

                }
                {
                    (currentPage > 2) && <button className="table-pagination-button" onClick={() => handlePageChange(currentPage - 2)}>{currentPage - 2}</button>

                }
                {
                    (currentPage > 1) && <button className="table-pagination-button" onClick={() => handlePageChange(currentPage - 1)}>{currentPage - 1}</button>

                }
                {
                    <button className="table-pagination-button" onClick={() => handlePageChange(currentPage)}>{currentPage}</button>

                }
                {
                    (currentPage + 1 <= totalPages) && <button className="table-pagination-button" onClick={() => handlePageChange(currentPage + 1)}>{currentPage + 1}</button>

                }
                {
                    (currentPage + 2 <= totalPages) && <button className="table-pagination-button" onClick={() => handlePageChange(currentPage + 2)}>{currentPage + 2}</button>

                }
                {
                    (currentPage + 3 <= totalPages) && <button className="table-pagination-button" onClick={() => handlePageChange(totalPages)}>...</button>

                }

                <button className="table-pagination-button" onClick={() => handlePageChange(currentPage + 1)}>&rsaquo;</button>
                <button className="table-pagination-button" onClick={() => handlePageChange(totalPages)}>&raquo;</button>

            </div>
            <div className="table-list-info">
                <p>Showing {((currentPage - 1) * limit + 1 <= totalItems) ? (currentPage - 1) * limit + 1 : 0} to {((currentPage) * limit > totalItems) ? totalItems : (currentPage) * limit} of {totalItems}</p>
            </div>
        </div>
    )
}