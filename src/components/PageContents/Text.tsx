import React from "react";
import { useSWRInfinite } from "swr";
import { Ending } from "../Ending";
import { InfinityScroll } from "../InfinityScroll";
import { Loading } from "../Loading";

export const TextInfinityScroll: React.VFC = () => {
  const CONTENT_NUM = 15;
  const CONTENT_LIMIT = 50;

  const getKey = (pageIndex: number) => {
    return pageIndex.toString();
  };

  const fetcher = (key: string): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result: string[] = [...Array(CONTENT_NUM)].map((_, index) => {
          return `item-${Number(key) * CONTENT_NUM + index + 1}`;
        });
        resolve(result);
      }, 1000);
    });
  };

  const swr = useSWRInfinite<string[]>(getKey, fetcher);

  return (
    <section className="p-8">
      <h2>Text</h2>
      <div className="w-full">
        <InfinityScroll
          swr={swr}
          loadingIndicator={<Loading />}
          endingIndicator={<Ending />}
          isReachingEnd={(swr) => !!swr.data && swr.data.flat().length > CONTENT_LIMIT}
        >
          {(response: string[]) => {
            return response.map((text) => {
              return (
                <div
                  key={`box-${text}`}
                  className="flex items-center justify-center h-12 rounded-md mb-4 bg-gray-300"
                >
                  <span>{`box-${text}`}</span>
                </div>
              );
            });
          }}
        </InfinityScroll>
      </div>
    </section>
  );
};
