import { useEffect, useState } from "react";

const useIntersectionObserver = (ref) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = new IntersectionObserver(
    (entries) => {
      console.log("observing");
      const entry = entries[0];

      if (entry.isIntersecting) {
        console.log(true);
        setIsIntersecting(true);
      } else setIsIntersecting(false);
    },
    { threshold: 0.8 }
  );

  useEffect(() => {
    if (!ref) return;
    console.log(ref);
    observer.observe(ref);
    return () => observer.unobserve(ref);
  }, [ref]);
  return isIntersecting;
};

export default useIntersectionObserver;
