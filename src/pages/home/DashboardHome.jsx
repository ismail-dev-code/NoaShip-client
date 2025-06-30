import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUsers, FaBox, FaUserCheck, FaUserClock } from "react-icons/fa";

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard-stats");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-8">Loading dashboard data...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard title="Total Users" count={data.totalUsers} icon={<FaUsers />} color="bg-blue-100 text-blue-700" />
      <StatCard title="Total Parcels" count={data.totalParcels} icon={<FaBox />} color="bg-green-100 text-green-700" />
      <StatCard title="Pending Parcels" count={data.pendingParcels} icon={<FaBox />} color="bg-yellow-100 text-yellow-700" />
      <StatCard title="Active Riders" count={data.activeRiders} icon={<FaUserCheck />} color="bg-purple-100 text-purple-700" />
      <StatCard title="Pending Riders" count={data.pendingRiders} icon={<FaUserClock />} color="bg-red-100 text-red-700" />
    </div>
  );
};

const StatCard = ({ title, count, icon, color }) => (
  <div className={`p-6 rounded-lg shadow-md flex items-center justify-between ${color}`}>
    <div>
      <p className="text-lg font-semibold">{title}</p>
      <h3 className="text-2xl font-bold">{count}</h3>
    </div>
    <div className="text-3xl">{icon}</div>
  </div>
);

export default DashboardHome;
