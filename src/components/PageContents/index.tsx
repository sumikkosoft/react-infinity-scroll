import React, { createContext, useContext, useState } from "react";
import { GitHubInfinityScroll } from "./GitHub";
import { TextInfinityScroll } from "./Text";

const pathList = {
  text: "Text",
  github: "GitHub",
} as const;

type Path = typeof pathList[keyof typeof pathList];

const RouterContext = createContext<Path>("Text");

const Route: React.FC<{ path: Path }> = ({ path, children }) => {
  const currentPath = useContext(RouterContext);
  if (path === currentPath) {
    return <>{children}</>;
  }
  return <></>;
};

const Router: React.FC<{ path: Path }> = ({ path, children }) => {
  return <RouterContext.Provider value={path}>{children}</RouterContext.Provider>;
};

export const PageContents: React.VFC = () => {
  const [path, setPath] = useState<Path>("Text");

  return (
    <div>
      <nav>
        <ul className="flex gap-3">
          {Object.values(pathList).map((p, i) => {
            return (
              <li key={i}>
                <button
                  onClick={() => {
                    setPath(p);
                  }}
                >
                  {p}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <main className="mt-8">
        <Router path={path}>
          <Route path="Text">
            <TextInfinityScroll />
          </Route>
          <Route path="GitHub">
            <GitHubInfinityScroll />
          </Route>
        </Router>
      </main>
    </div>
  );
};
