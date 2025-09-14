import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAdminSummary from "../../hooks/admin/useAdminSummary";
import { FaUsers, FaStore, FaStar } from "react-icons/fa";

const AdminDashboardOverview = () => {
  const [summary, setSummary] = useState(null);
  const getAdminSummary = useAdminSummary();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAdminSummary();
      if (res.status === 200) {
        setSummary(res.data.data); // note: `data` inside `data`
      } else {
        toast.error(res.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-4xl font-bold text-center text-primary mb-6">
        📊 Admin Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-lg border border-primary">
          <div className="card-body text-center">
            <FaUsers className="text-primary text-3xl mx-auto" />
            <h3 className="text-lg font-semibold mt-2">Total Users</h3>
            <p className="text-3xl font-bold text-primary">
              {summary?.totalUsers ?? "-"}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg border border-secondary">
          <div className="card-body text-center">
            <FaStore className="text-secondary text-3xl mx-auto" />
            <h3 className="text-lg font-semibold mt-2">Total Stores</h3>
            <p className="text-3xl font-bold text-secondary">
              {summary?.totalStores ?? "-"}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg border border-accent">
          <div className="card-body text-center">
            <FaStar className="text-accent text-3xl mx-auto" />
            <h3 className="text-lg font-semibold mt-2">Total Ratings</h3>
            <p className="text-3xl font-bold text-accent">
              {summary?.totalRatings ?? "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOverview;
