import { useEffect, useState } from "react";
import { fetchExpenses } from "./api";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";


function App() {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);


  async function loadExpenses() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchExpenses(category);
      setExpenses(data);
    } catch (err) {
      setError("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  }

  function handleExpenseAdded() {
    loadExpenses();
    setRefreshKey(prev => prev + 1);
  }

  useEffect(() => {
    loadExpenses();
  }, [category]);

  return (
    <div>
      <h2>Expense Tracker</h2>

      <ExpenseForm onSuccess={handleExpenseAdded} />

      <hr />

      <input
        placeholder="Filter by category"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && <ExpenseList expenses={expenses} />}

      <hr />
      <ExpenseSummary refreshKey={refreshKey}/>

    </div>
  );
}

export default App;
