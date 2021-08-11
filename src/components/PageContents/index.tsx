import React from "react";
import { InfinityScroll } from "../InfinityScroll";
import { Loading } from "../Loading";

export const PageContents: React.VFC = () => {
  return (
    <main className="mt-8">
      <section>
        <h2>自動load</h2>
        <div className="w-full max-w-md h-96 overflow-y-auto p-8">
          <InfinityScroll fallback={<Loading />} />
        </div>
      </section>
    </main>
  );
};
