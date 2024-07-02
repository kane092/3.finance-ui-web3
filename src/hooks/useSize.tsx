import { useState, useEffect } from "react";

export type WindowSize = "xs" | "sm" | "md" | "lg" | "xl";

const useSize = () => {
  const [size, setSize] = useState<WindowSize | undefined>(undefined);

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < 640 && size !== "xs") setSize("xs");
      else if (
        window.innerWidth >= 640 &&
        window.innerWidth < 768 &&
        size !== "sm"
      )
        setSize("sm");
      else if (
        window.innerWidth >= 768 &&
        window.innerWidth < 1024 &&
        size !== "md"
      )
        setSize("md");
      else if (
        window.innerWidth >= 1024 &&
        window.innerWidth < 1280 &&
        size !== "lg"
      )
        setSize("lg");
      else if (window.innerWidth > 1280 && size !== "xl") setSize("xl");
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return size;
};

export default useSize;
