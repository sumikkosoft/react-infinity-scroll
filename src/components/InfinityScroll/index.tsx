import React, { useEffect } from "react";
import type { SWRInfiniteResponse } from "swr";
import { useIntersection } from "../../hooks/useIntersection";

type Props<T> = {
  swr: SWRInfiniteResponse<T>;
  children: (item: T) => React.ReactNode;
  type?: "auto" | "click";
  loadingIndicator?: React.ReactNode;
  endingIndicator?: React.ReactNode;
  clickIndicator?: React.ReactNode;
  isReachingEnd: boolean | ((swr: SWRInfiniteResponse<T>) => boolean);
};

export const InfinityScroll = <T extends {}>(props: Props<T>): React.ReactElement<Props<T>> => {
  const {
    swr,
    swr: { data, setSize },
    children,
    loadingIndicator,
    endingIndicator,
    isReachingEnd,
  } = props;

  const [intersecting, ref] = useIntersection<HTMLDivElement>();

  const ending = typeof isReachingEnd === "function" ? isReachingEnd(swr) : isReachingEnd;

  useEffect(() => {
    if (intersecting && !ending) {
      console.log("add");
      setSize((size) => size + 1);
    }
  }, [intersecting, setSize, ending]);

  if (!data) return <>{loadingIndicator}</>;

  return (
    <>
      {data.map((item) => children(item))}
      <div className="relative">
        <div className="absolute" ref={ref}></div>
        {ending ? endingIndicator : loadingIndicator}
      </div>
    </>
  );
};
