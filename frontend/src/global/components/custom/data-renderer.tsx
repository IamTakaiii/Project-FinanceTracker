import React from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface DataRendererProps<T> {
  isLoading: boolean;
  isFetching: boolean;
  data: T[] | undefined;
  render: (item: T) => React.ReactNode;
  skeleton: React.ReactNode;
  emptyState: React.ReactNode;
  skeletonCount?: number;
}

export const DataRenderer = <T,>({
  isLoading,
  isFetching,
  data,
  render,
  skeleton,
  emptyState,
  skeletonCount = 4,
}: DataRendererProps<T>) => {
  if (isLoading || (isFetching && !data?.length)) {
    return (
      <>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <React.Fragment key={i}>{skeleton}</React.Fragment>
        ))}
      </>
    );
  }

  if (!data || data.length === 0) {
    return <>{emptyState}</>;
  }

  return <>{data.map((item) => render(item))}</>;
};

export const CardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-1/3" />
      </CardContent>
    </Card>
  );
};

type NoDataEmptyStateProps = {  
    message?: string;
    description?: string;
};

export const NoDataEmptyState = ({message, description}: NoDataEmptyStateProps) => {
  return (
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight text-primary">
          {message || "You have no any data yet"}
        </h3>
        <p className="text-sm text-muted-foreground">
            {description || "Start by adding some data to see it here."}
        </p>
      </div>
  );
}