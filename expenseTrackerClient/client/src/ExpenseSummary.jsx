import { useEffect, useState } from "react";
import { fetchSummary } from "./api";

function ExpenseSummary({ refreshKey }) {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSummary() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchSummary();
        setSummary(data);
      } catch {
        setError("Failed to load summary");
      } finally {
        setLoading(false);
      }
    }

    loadSummary();
  }, [refreshKey]); // 🔑 refresh when expense added

  return (
    <div>
      <h3>Category Summary</h3>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading &&
        Object.entries(summary).map(([category, total]) => (
          <div key={category}>
            {category} : ₹{Number(total).toFixed(2)}
          </div>
        ))}
    </div>
  );
}

export default ExpenseSummary;
