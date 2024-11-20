import { useCallback, useEffect, useState } from "react";

interface Props<R> {
  queryFn: () => Promise<R>;
}
export default function useQuery<R>({ queryFn }: Props<R>) {
  const [data, setData] = useState<R>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const refetch = useCallback(() => {
    setLoading(true);
    queryFn()
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [queryFn]);

  useEffect(() => {
    setLoading(true);
    queryFn()
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [queryFn]);

  return {
    data,
    refetch,
    isLoading,
    error,
  };
}
