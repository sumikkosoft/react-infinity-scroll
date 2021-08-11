import { Ref, useLayoutEffect, useState } from "react";

export const useIntersection = <T extends HTMLElement>(): [boolean, Ref<T>] => {
  const [intersecting, setIntersecting] = useState<boolean>(false);
  const [element, setElement] = useState<HTMLElement>();
  useLayoutEffect(() => {
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });
    observer.observe(element);

    return () => observer.unobserve(element);
  }, [element]);

  return [intersecting, (el) => el && setElement(el)];
};
