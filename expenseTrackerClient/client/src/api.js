const BASE_URL = "/expenses";

export async function fetchExpenses(category) {
  const url = category ? `${BASE_URL}?category=${category}` : BASE_URL;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch expenses");
  }
  return res.json();
}

export async function createExpense(expense) {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": crypto.randomUUID()
    },
    body: JSON.stringify(expense)
  });

  if (!res.ok) {
    const err = await res.json();
    throw err;
  }

  return res.json();
}

export async function fetchSummary() {
  const res = await fetch(`${BASE_URL}/summary`);

  if (!res.ok) {
    throw new Error("Failed to fetch summary");
  }

  return res.json();
}

