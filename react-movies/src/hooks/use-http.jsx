import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (url, requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetch(url, requestConfig);
      if (!result.ok) {
        throw new Error("Something went wrong");
      }
      const data = await result.json();
      applyData(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
  };
};

export default useHttp;
