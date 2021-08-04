import React, { useCallback, useLayoutEffect, useRef, useState } from "react";

export const Loading: React.VFC<{ delay?: number }> = ({ delay = 500 }) => {
  const [dot, setDot] = useState<number>(0);
  const refTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleAnimation = useCallback(() => {
    setDot((prev) => {
      return (prev + 1) % 4;
    });

    refTimer.current = setTimeout(handleAnimation, delay);
  }, [delay]);

  useLayoutEffect(() => {
    setTimeout(handleAnimation, delay);
    return () => refTimer.current && clearTimeout(refTimer.current);
  }, [handleAnimation, delay]);

  return (
    <div className="flex items-center justify-center h-12">
      <span className="block w-12">Loading{".".repeat(dot)}</span>
    </div>
  );
};
