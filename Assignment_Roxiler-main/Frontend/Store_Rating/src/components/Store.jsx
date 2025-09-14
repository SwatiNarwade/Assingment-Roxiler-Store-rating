import React from 'react';
import useStores from '../hooks/useStores';
import { ToastContainer } from 'react-toastify';

const Store = () => {
  const {
    stores,
    userRatings,
    loading,
    setUserRatings,
    submitRating
  } = useStores();

  const handleChange = (storeId, field, value) => {
    setUserRatings((prev) => ({
      ...prev,
      [storeId]: {
        ...prev[storeId],
        [field]: value
      }
    }));
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4  space-y-8">
        <ToastContainer/>
      <h1 className="text-2xl font-bold text-center mb-6">Store Listings</h1>

      {stores.map((store) => {
        const { StoreId, storeName, storeAddress, averageRating } = store;
        const userRating = userRatings[StoreId] || {};
        const isExistingRating = !!userRating.rating;

        return (
          <div key={StoreId} className="border p-4 rounded gap-10  shadow space-y-2">
            <h2 className="text-xl font-semibold">{storeName}</h2>
            <p className="text-gray-600">Address: {storeAddress}</p>
            <p>Average Rating: <strong>{averageRating || "No ratings yet"}</strong></p>

            <div>
              <label className="block font-medium">Your Rating (1-5):</label>
              <input
                type="number"
                min="1"
                max="5"
                value={userRating.rating || ''}
                onChange={(e) => handleChange(StoreId, "rating", e.target.value)}
                className="border px-2 py-1 w-20"
              />
            </div>

            <div>
              <label className="block font-medium">Comment:</label>
              <textarea
                rows="2"
                value={userRating.comment || ''}
                onChange={(e) => handleChange(StoreId, "comment", e.target.value)}
                className="border px-2 py-1 w-full"
              ></textarea>
            </div>

            <button
              onClick={() => submitRating(StoreId, userRating.rating, userRating.comment)}
              className="bg-blue-600 hover:bg-blue-800 text-white py-1 px-4 rounded btn-primary"
            >
              {isExistingRating ? "Update Rating" : "Submit Rating"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Store;
