import { useCallback, useEffect, useState, useRef } from "react";

type QueryFunction<T, V> = (variables: V) => Promise<T>;

type UseQueryProps<V> = {
  queryKey: string;
  queryFn: QueryFunction<any, any>;
  variables: V;
  enabled?: boolean;
};

export const useQuery = <TData, TVariables>({
  queryKey,
  queryFn,
  variables,
  enabled = true,
}: UseQueryProps<TVariables>) => {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isLoadingRef = useRef(false);

  const fetchData = useCallback(async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const response = await queryFn(variables);
      setData(response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `An error occurred while fetching ${queryKey}.`
      );
      setData(null);
    } finally {
      setLoading(false);
      isLoadingRef.current = false;
    }
  }, [queryKey, queryFn, variables]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    } else {
      setData(null);
      setError(null);
    }
  }, [enabled, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};