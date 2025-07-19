export default function Dashboard({ jobs }) {
  return (
    <div className="space-y-2">
      {jobs.map((job, index) => (
        <div key={index} className="border p-2 rounded bg-gray-50">
          <p>Job #{index + 1}</p>
          <p>Result: {job.result}</p>
          <p>Duration: {job.duration} ms</p>
        </div>
      ))}
    </div>
  );
}