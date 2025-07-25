import { useState, useEffect, useCallback, useRef } from "react";

export default function useSearchWorker(data) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const workerRef = useRef();

  useEffect(() => {
    workerRef.current = new Worker(new URL("../workers/searchWorker.js", import.meta.url));
    workerRef.current.onmessage = (e) => {
      setResults(e.data);
      setLoading(false);
    };

    return () => {
      workerRef.current.terminate();
    };
  }, []);

  const search = useCallback(
    (query) => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      workerRef.current.postMessage({ data, query });
    },
    [data]
  );

  return [results, search, loading];
}
