import { ReactNode, useMemo, useState } from 'react';
import styles from './Table.module.css';

export interface TableColumn<T> {
  key: keyof T;
  header: string;
}

interface TableProps<T> {
  columns: Array<TableColumn<T>>;
  data: T[];
  itemsPerPage?: number;
  className?: string;
}

const Table = <T,>({
  columns,
  data,
  itemsPerPage = 10,
  className = ''
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Memoizing totalPages to prevent unnecessary recalculation on every render
  const totalPages = useMemo(
    () => Math.ceil(data.length / itemsPerPage),
    [data, itemsPerPage]
  );

  const paginatedData = useMemo(() => {
    return data.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [data, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className={`${styles.tableContainer} ${className}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key as string} className={styles.header}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.row}>
              {columns.map((col) => (
                <td key={col.key as string} className={styles.cell}>
                  {row[col.key] === undefined || row[col.key] === null
                    ? ('' as ReactNode)
                    : (row[col.key] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button
          className={styles.pageButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &laquo; Prev
        </button>
        <span className={styles.pageInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={styles.pageButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
};

export default Table;
