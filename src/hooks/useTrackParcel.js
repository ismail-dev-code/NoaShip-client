
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useTrackParcel = (trackingId) => {
  const axiosSecure = useAxiosSecure();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    enabled: !!trackingId,
    queryKey: ["trackingLogs", trackingId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tracking/${trackingId}`);
      return res.data;
    },
  });

  return { data, isLoading, isError, refetch };
};

export default useTrackParcel;
