import { useState } from "react";
import { createExpense } from "./api";

function ExpenseForm({ onSuccess }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      await createExpense(form);
      setForm({ amount: "", category: "", description: "", date: "" });
      onSuccess();
    } catch (err) {
      setError("Failed to save expense");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Expense</h3>

      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
      />

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />

      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
      />

      <button disabled={loading}>
        {loading ? "Saving..." : "Add Expense"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default ExpenseForm;
