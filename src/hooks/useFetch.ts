import { useEffect, useState } from "react";
export default function useFetch(config?) {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const refetch = async (request) => {
    setLoading(true);
    try {
      const response = await fetch(request.url, request.config);
      const json = await response.json();
      setData(json);
    } catch (e) {
      setError(e);
    }
    setLoading(false), 1000;
  };
  useEffect(() => {
    if (config) {
      refetch(config);
    }
  }, []);
  return { data, loading, error, refetch };
}
