import { useCallback, useState } from "react";

export const useHttp = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const sendRequest = useCallback(async ({ url, method, body }, applyData) => {
    setLoading(true);
    const response = await fetch(url, {
      method: method ? method : "GET",
      body: body ? JSON.stringify(body) : null,
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);
    if (!response.ok) {
      setError("Something went wrong");
      return;
    } else {
      const fetchData = await response.json();
      setData(fetchData);
      setSuccess("Request succeed");
      if (applyData) {
        applyData(fetchData);
      }
    }
  }, []);

  return {
    sendRequest,
    loading,
    error,
    data,
    success,
  };
};
