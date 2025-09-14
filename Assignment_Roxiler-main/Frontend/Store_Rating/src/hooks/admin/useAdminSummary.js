import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

const useAdminSummary = () => {
  return async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin-dashboard-summary`, {
        withCredentials: true,
      });
      return res;
    } catch (err) {
      return {
        status: err.response?.status || 500,
        message: err.response?.data?.message || 'Server error',
      };
    }
  };
};

export default useAdminSummary;
