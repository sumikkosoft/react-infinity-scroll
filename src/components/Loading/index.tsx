import React from "react";
import styles from "./Loading.module.scss";

export const Loading: React.VFC = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className={styles.loading}></div>;
    </div>
  );
};
