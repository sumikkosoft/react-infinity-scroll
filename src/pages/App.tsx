import React from "react";
import { PageContents } from "../components/PageContents";
// import { CountBox } from "../components/CountBox";

const App = () => {
  return (
    <div className="container mx-auto">
      <h1 className="block mt-4 text-4xl font-bold">react-infinity-scroll</h1>
      <PageContents />
      {/* <CountBox /> */}
    </div>
  );
};

export default App;
