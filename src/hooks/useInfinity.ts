import { useSWRInfinite } from "swr";

export const useInfinity = () => {
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

  const { data, size, setSize } = useSWRInfinite<string[]>(getKey, fetcher);

  return [data, size, setSize];
};
