import { ApiResponse, Columns } from './interface';

export const parseApiResponse = (apiData: ApiResponse[]): Columns[] => {
  return apiData.map((item) => ({
    sNo: item['s.no'],
    percentageFunded: `${item['percentage.funded']}`,
    amtPledged: item['amt.pledged']
  }));
};
