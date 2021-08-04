import React, { useState } from "react";
import { useInfinity } from "../../hooks/useInfinity";
import { useScroll } from "../../hooks/useScroll";

type Props = {
  fallback: JSX.Element;
};

const ItemList: React.VFC<{ items: string[] }> = React.memo(({ items }) => {
  return (
    <>
      {items.map((v) => {
        return (
          <div
            key={`box-${v}`}
            className="flex items-center justify-center h-12 rounded-md mb-4 bg-gray-300"
          >
            <span>{`box-${v}`}</span>
          </div>
        );
      })}
    </>
  );
});

export const InfinityScroll: React.VFC<Props> = ({ fallback }) => {
  const [scroll] = useScroll(1000);
  const [items, setItem] = useState<string[]>([]);
  const [isLoad, setState] = useState<boolean>(true);
  const [data, size, setData] = useInfinity();

  return (
    <div>
      {data && <ItemList items={data.flat()} />}
      {!data && fallback}
      <button
        className="p-2 bg-gray-100"
        onClick={() => {
          setData(size + 1);
        }}
      >
        add
      </button>
    </div>
  );
};
