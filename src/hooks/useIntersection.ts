import { Ref, useEffect, useState } from "react";

export interface UseIntersectionObserverResponse {
  lastDataRef: (node: any) => void;
}

// type UseIntersectionObserver = {
//   isLoadingMore: boolean | undefined;
// };

export const useIntersection = <T extends HTMLElement>(): [boolean, Ref<T>] => {
  const [intersecting, setIntersecting] = useState<boolean>(false);
  const [element, setElement] = useState<HTMLElement>();
  useEffect(() => {
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (intersecting !== entry.isIntersecting) {
        setIntersecting(entry.isIntersecting);
      }
    });
    observer.observe(element);

    return () => observer.unobserve(element);
  }, [element, intersecting]);

  return [intersecting, (el) => el && setElement(el)];
};
