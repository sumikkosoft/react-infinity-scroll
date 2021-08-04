import React from "react";
import { InfinityScroll } from "../InfinityScroll";
import { Loading } from "../Loading";

export const PageContents: React.VFC = () => {
  return (
    <main className="mt-8">
      <InfinityScroll fallback={<Loading />} />
    </main>
  );
};
