import recordCheckApi from './recordCheck';
import dataStatisticsApi from './dataStatistics';
const API = {
    ...recordCheckApi,
    ...dataStatisticsApi
};
export default API;
