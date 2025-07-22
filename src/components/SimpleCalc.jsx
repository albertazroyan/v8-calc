import { useState, useEffect, useRef } from "react";

export default function SimpleCalc() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(null);
  const workerRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    workerRef.current = new Worker(new URL("../workers/SimpleWorker.js", import.meta.url));
    workerRef.current.onmessage = (e) => {
      setResult(e.data);
      setDuration(performance.now() - startTimeRef.current);
      setLoading(false);
    };
    return () => {
      workerRef.current.terminate();
    };
  }, []);

  const startCalculation = () => {
    setLoading(true);
    setResult(null);
    setDuration(null);
    startTimeRef.current = performance.now();
    workerRef.current.postMessage({ size: 1000 });
  };

  return (
    <div style={{ marginTop: 20, padding: 10, border: "1px solid #ccc", borderRadius: 8 }}>
      <button onClick={startCalculation} disabled={loading}>
        {loading ? "Calculating..." : "Start Simple Calculation"}
      </button>
      {result && <p>Result: {result}</p>}
      {duration && <p>Duration: {duration.toFixed(2)} ms</p>}
    </div>
  );
}
