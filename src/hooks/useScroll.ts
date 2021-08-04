import { useLayoutEffect, useState } from "react";
import { debounce } from "../utils/debounce";

type ScrollData = {
  y: number;
  ratio: number;
};

export const useScroll = (delay = 10) => {
  const [scroll, setScroll] = useState<ScrollData>({ y: 0, ratio: 0 });
  useLayoutEffect(() => {
    const updateScroll = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const viweHeight = document.documentElement.clientHeight;
      const maxScrollHeight = documentHeight - viweHeight;
      const scrollHeight = window.scrollY;

      setScroll({ y: scrollHeight, ratio: scrollHeight / maxScrollHeight });
    };
    const debouncedHandleScroll = debounce(updateScroll, delay);
    window.addEventListener("scroll", debouncedHandleScroll);
    updateScroll();
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [delay]);
  return [scroll];
};
