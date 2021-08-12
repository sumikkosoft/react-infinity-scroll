import React from "react";
import { useSWRInfinite } from "swr";
import { ClickBox } from "../ClickBox";
import { Ending } from "../Ending";
import { InfinityScroll } from "../InfinityScroll";
import { Loading } from "../Loading";

type Issue = {
  id: string;
  title: string;
  user: { login: any };
  created_at: any;
};

type GitHubResponse = Issue[];

export const GitHubInfinityScroll: React.VFC = () => {
  const PAGE_SIZE = 5;

  const getKey = (pageIndex: number) => {
    return `https://api.github.com/repos/facebook/react/issues?per_page=${PAGE_SIZE}&page=${
      pageIndex + 1
    }`;
  };

  const fetcher = (key: string): Promise<GitHubResponse> => {
    return fetch(key).then((res) => res.json());
  };

  const swr = useSWRInfinite<GitHubResponse>(getKey, fetcher);

  if (swr.error) return <p>response error</p>;

  return (
    <section className="p-8">
      <h2>GitHub Issue</h2>
      <div className="w-full">
        <InfinityScroll
          swr={swr}
          loadingIndicator={<Loading />}
          endingIndicator={<Ending />}
          clickIndicator={<ClickBox />}
          isReachingEnd={(swr) =>
            !!swr.data &&
            (swr.data?.[0]?.length === 0 || swr.data?.[swr.data?.length - 1]?.length < PAGE_SIZE)
          }
          type="click"
        >
          {(response: GitHubResponse) => {
            return response.map((issue) => {
              return (
                <div
                  key={issue.id}
                  style={{
                    padding: "20px",
                    borderRadius: "8px",
                    border: "solid #ccc 1px",
                    margin: "20px auto",
                    maxWidth: "400px",
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{issue.title}</div>
                  <div style={{ color: "#aaa", marginTop: "8px" }}>
                    {issue.user.login} • {new Date(issue.created_at).toDateString()}
                  </div>
                </div>
              );
            });
          }}
        </InfinityScroll>
      </div>
    </section>
  );
};
