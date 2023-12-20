import { useEffect, useState } from "react";
const baseURL = "http://localhost:2800";

const useFetch = (route, loadMore) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const controller = new AbortController();

  useEffect(() => {
    if (loadMore) {
      fetchAPI(route);
      setIsLoading(true);
    }
  }, [loadMore]);

  const fetchAPI = async (route, n = 3) => {
    if (n > 0) {
      const response = await fetch(`${baseURL}${route}`).catch((err) =>
        setError(err)
      );
      const res = await response.json();
      if (!response.ok) {
        console.log(4 - n, "try fail");
        setTimeout(() => {
          return fetchAPI(route, --n);
        }, 2000);
      } else {
        setData(res);
        setIsLoading(false);
        console.log(4 - n, "try successful");
      }
    } else {
      setIsLoading(false);
      console.log("no proper response in 3 tries");
    }
  };

  return { data, isLoading, error, controller };
};

export default useFetch;
