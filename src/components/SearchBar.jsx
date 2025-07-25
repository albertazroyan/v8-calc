import { useState, useEffect } from "react";
import useSearchWorker from "../hooks/useSearchWorker";

export default function SearchBar({ data }) {
  const [query, setQuery] = useState("");
  const [results, search, loading] = useSearchWorker(data);

  useEffect(() => {
    const handler = setTimeout(() => {
      search(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query, search]);

  return (
    <div style={{ marginTop: 20 }}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
      />
      {loading && <p>Searching...</p>}
      <ul>
        {results.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
