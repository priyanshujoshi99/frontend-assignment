import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { TableColumn } from '../../components/Table/Table';
import { apiClient } from '../../helpers/apiClient';
import { getFetchProjectUrl } from '../../helpers/apiEndpointHelper';
import { parseApiResponse } from '../../helpers/apiResponseParser';
import { PAGINATION_SIZE } from '../../helpers/constants';
import { ApiResponse, Columns } from '../../helpers/interface';
import styles from './Home.module.css';

const Home = () => {
  const [data, setData] = useState<Columns[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns: TableColumn<Columns>[] = [
    { key: 'sNo', header: 'S.No.' },
    { key: 'percentageFunded', header: 'Percentage funded' },
    { key: 'amtPledged', header: 'Amount pledged' }
  ];

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient<ApiResponse[]>(getFetchProjectUrl(), {
        method: 'GET'
      });

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        const parsedData = parseApiResponse(response.data);
        setData(parsedData);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred while fetching data'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h1 className={styles.errorTitle}>Error</h1>
        <p className={styles.errorMessage}>{error}</p>
        <button onClick={fetchData} className={styles.retryButton}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Project Details</h1>
        <button onClick={fetchData} className={styles.refreshButton}>
          Refresh Data
        </button>
      </div>
      <Table columns={columns} data={data} itemsPerPage={PAGINATION_SIZE} />
    </div>
  );
};

export default Home;
