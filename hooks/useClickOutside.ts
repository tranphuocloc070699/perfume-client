import { useEffect, useRef } from "react";

export const useClickOutSide = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mouseup", handleClickOutSide);
    document.addEventListener("touchend", handleClickOutSide);

    return () => {
      document.removeEventListener("mouseup", handleClickOutSide);
      document.removeEventListener("touchend", handleClickOutSide);
    };
  }, [callback]);

  return ref;
};
