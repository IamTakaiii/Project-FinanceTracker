import { useCallback, useEffect, useState, useRef } from "react";

type QueryFunction<T, Q> = (query: Q) => Promise<PaginatedResponse<T>>;

type PaginatedResponse<T> = {
  data: T[];
  nextCursor?: string | null;
  totalItems?: number;
};

type PaginationOptions =
  | { mode: "cursor" }
  | { mode: "offset"; limit: number; initialPage?: number };

type UsePaginatedQueryProps<Q> = {
  queryKey: string;
  queryFn: QueryFunction<any, any>;
  queryOptions: Omit<Q, "cursor" | "limit" | "offset">;
  pagination: PaginationOptions;
  enabled?: boolean;
};

export const usePaginatedQuery = <TData, TQuery>({
  queryKey,
  queryFn,
  queryOptions,
  pagination,
  enabled = true,
}: UsePaginatedQueryProps<TQuery>) => {
  const [data, setData] = useState<TData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isLoadingRef = useRef(false);

  const [currentPage, setCurrentPage] = useState(
    pagination.mode === "offset" ? pagination.initialPage ?? 1 : 1
  );
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState<number>(0);

  const isOffsetMode = pagination.mode === "offset";

  const fetchData = useCallback(async (isRefetch: boolean = false) => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setLoading(true);
    if (isRefetch) {
      setError(null);
    }

    try {
      const query: Record<string, any> = { ...queryOptions };
      if (isOffsetMode) {
        Object.assign(query, {
          limit: pagination.limit,
          offset: (currentPage - 1) * pagination.limit,
        });
      } else if (nextCursor && !isRefetch) {
        query.cursor = nextCursor;
      }

      const response = await queryFn(query);

      setData((prev) => (isRefetch ? response.data : [...prev, ...response.data]));

      if (isOffsetMode) {
        setTotalItems(response.totalItems ?? 0);
      } else {
        setNextCursor(response.nextCursor ?? null);
      }
      if (!isRefetch) setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `An error occurred while fetching ${queryKey}.`
      );
    } finally {
      setLoading(false);
      isLoadingRef.current = false;
    }
  }, [
    queryFn,
    queryOptions,
    pagination,
    currentPage,
    nextCursor,
    queryKey,
    isOffsetMode,
  ]);

  const refetchData = useCallback(() => {
    setData([]);
    if (isOffsetMode) {
      if (currentPage !== 1) {
        setCurrentPage(1);
      } else {
        fetchData(true);
      }
    } else {
      setNextCursor(null);
      fetchData(true);
    }
  }, [isOffsetMode, currentPage, fetchData]);

  useEffect(() => {
    if (enabled) {
      refetchData();
    }
  }, [enabled, queryOptions]);

  useEffect(() => {
    if (enabled && isOffsetMode && currentPage > 1) {
      fetchData(false);
    }
  }, [currentPage, enabled, isOffsetMode]);


  const loadMore = useCallback(() => {
    if (loading) return;
    if (isOffsetMode) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      fetchData(false);
    }
  }, [loading, isOffsetMode, fetchData]);


  const hasNextPage = isOffsetMode
    ? data.length < totalItems
    : !!nextCursor;

  return {
    data,
    loading,
    error,
    hasNextPage,
    loadMore,
    refetch: refetchData,
    currentPage,
    totalItems,
  };
};