import { useEffect } from "react";
export function useFetch(callback, url, name) {
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);
      const data = await res.json();
      callback(data[name]);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
