import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { toast } from 'react-toastify';

const useStores = () => {
  const [stores, setStores] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchStores = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/all-stores`, { withCredentials: true });
      const ratingsRes = await axios.get(`${BASE_URL}/user-ratings`, { withCredentials: true });

      const userRatingMap = {};
      ratingsRes.data.forEach((r) => {
        userRatingMap[r.StoreId] = { rating: r.rating, comment: r.comment, exists: true };
      });

      setUserRatings(userRatingMap);
      setStores(res.data);
    } catch (err) {
      toast.error("Failed to load stores.");
    } finally {
      setLoading(false);
    }
  };

  const submitRating = async (storeId, rating, comment) => {
    try {
      const isUpdate = userRatings[storeId]?.exists;

      const url = isUpdate ? `${BASE_URL}/update-rating` : `${BASE_URL}/add-Rating`;
      const method = isUpdate ? 'patch' : 'post';

      await axios[method](url, { StoreId: storeId, rating, comment }, { withCredentials: true });

      toast.success(isUpdate ? "Rating updated!" : "Rating submitted!");
      fetchStores(); // refresh
    } catch (err) {
      toast.error(err.response?.data?.message || "Error submitting rating.");
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return {
    stores,
    userRatings,
    loading,
    setUserRatings,
    submitRating
  };
};

export default useStores;
