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
    swr: { data, setSize, isValidating },
    type = "auto",
    children,
    loadingIndicator = <p>読込中</p>,
    endingIndicator = <p>終わり</p>,
    clickIndicator = <p>もっと読み込む</p>,
    isReachingEnd,
  } = props;

  const [intersecting, ref] = useIntersection<HTMLDivElement>();

  const ending = typeof isReachingEnd === "function" ? isReachingEnd(swr) : isReachingEnd;

  useEffect(() => {
    if (intersecting && !ending) {
      setSize((size) => size + 1);
    }
  }, [intersecting, setSize, ending]);

  if (!data) return <>{loadingIndicator}</>;

  return (
    <>
      {data.map((item) => children(item))}
      {type === "auto" && (
        <div className="relative">
          <div className="absolute" ref={ref}></div>
          {ending ? endingIndicator : loadingIndicator}
        </div>
      )}
      {type === "click" && (
        <div
          className="relative cursor-pointer"
          onClick={() => {
            setSize((size) => size + 1);
          }}
        >
          {ending ? endingIndicator : isValidating ? loadingIndicator : clickIndicator}
        </div>
      )}
    </>
  );
};
