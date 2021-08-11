import React, { useEffect } from "react";
import { useSWRInfinite } from "swr";
import { useIntersection } from "../../hooks/useIntersection";

type Props = {
  fallback: JSX.Element;
};

const getKey = (pageIndex: number) => {
  return pageIndex.toString();
};
const fetcher = (key: string): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...Array(30)].map((_, index) => `item-${Number(key) * 30 + index + 1}`));
    }, 3000);
  });
};

// const Items: React.VFC<{ items: string[] }> = React.memo(({ items }) => {
//   return (
//     <>
//       {items.map((v) => {
//         return (
//           <div
//             key={`box-${v}`}
//             className="flex items-center justify-center h-12 rounded-md mb-4 bg-gray-300"
//           >
//             <span>{`box-${v}`}</span>
//           </div>
//         );
//       })}
//     </>
//   );
// });

export const InfinityScroll: React.VFC<Props> = ({ fallback }) => {
  const { data, setSize, isValidating } = useSWRInfinite<string[]>(getKey, fetcher);
  const [intersecting, ref] = useIntersection<HTMLDivElement>();

  useEffect(() => {
    if (intersecting && !isValidating) {
      setSize((prev) => prev + 1);
    }
  }, [intersecting, isValidating, setSize]);

  if (!data) return <>{fallback}</>;

  return (
    <>
      {data.map((items) => {
        return items.map((v) => {
          return (
            <div
              key={`box-${v}`}
              className="flex items-center justify-center h-12 rounded-md mb-4 bg-gray-300"
            >
              <span>{`box-${v}`}</span>
            </div>
          );
        });
      })}
      <div className="relative">
        <div ref={ref} className="absolute"></div>
        {fallback}
        {/* <button
          onClick={() => {
            setSize((prev) => prev + 1);
          }}
        >
          click
        </button> */}
      </div>
    </>
  );
};
