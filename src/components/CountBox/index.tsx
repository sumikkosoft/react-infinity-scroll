import React, { useState } from "react";

const Box = () => {
  return (
    <div className="flex items-center justify-center h-12 rounded-md mb-4 bg-gray-300">box</div>
  );
};

export const CountBox = () => {
  const [cnt, setCnt] = useState(1);

  const addCnt = (n: number) => {
    setCnt((prev) => prev + n);
  };

  const content: any[] = [];

  for (let i = 0; i < cnt; i++) {
    content.push(<Box key={i} />);
  }

  return (
    <div className="mt-12">
      {content}

      <button className="p-2 bg-gray-200 m-2" onClick={() => addCnt(1)}>
        +1
      </button>
      <button className="p-2 bg-gray-200 m-2" onClick={() => addCnt(10)}>
        +10
      </button>
      <button className="p-2 bg-gray-200 m-2" onClick={() => addCnt(20)}>
        +20
      </button>
    </div>
  );
};
