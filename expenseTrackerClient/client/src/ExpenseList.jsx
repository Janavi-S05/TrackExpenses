
function ExpenseList({ expenses }) {
  const total = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  return (
    <div>
      <h3>Expenses</h3>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp.id}>
              <td>{exp.date}</td>
              <td>{exp.category}</td>
              <td>{exp.description}</td>
              <td>₹{exp.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Total: ₹{total}</h4>
    </div>
  );
}

export default ExpenseList;
