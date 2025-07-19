import { useState } from "react";
import usePerformance from "../hooks/usePerformance";
import { WorkerPool } from "../utils/workerPool";
import Dashboard from "./Dashboard";

const pool = new WorkerPool(2);

export default function Calculator() {
  const [jobs, setJobs] = useState([]);
  const { start, stop } = usePerformance();

  const runCalculation = async () => {
    start();
    const result = await pool.run({ matrixSize: 1500 });
    const duration = stop();
    setJobs(prev => [...prev, { result, duration }]);
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <button
        onClick={runCalculation}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Run Heavy Calculation
      </button>
      <Dashboard jobs={jobs} />
    </div>
  );
}