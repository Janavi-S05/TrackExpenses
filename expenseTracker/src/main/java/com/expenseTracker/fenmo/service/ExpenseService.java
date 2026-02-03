package com.expenseTracker.fenmo.service;

import com.expenseTracker.fenmo.dto.CreateExpenseRequest;
import com.expenseTracker.fenmo.model.Expense;
import com.expenseTracker.fenmo.repository.ExpenseRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.*;

@Service
public class ExpenseService {

    private final ExpenseRepository repo;

    public ExpenseService(ExpenseRepository repo) {
        this.repo = repo;
    }

    public Expense createExpense(CreateExpenseRequest req, String key) {

        return repo.findByIdempotencyKey(key)
                .orElseGet(() -> {
                    try {
                        Expense e = new Expense();
                        e.setAmount(req.amount());
                        e.setCategory(req.category());
                        e.setDescription(req.description());
                        e.setDate(req.date());
                        e.setCreatedAt(Instant.now());
                        e.setIdempotencyKey(key);
                        return repo.save(e);
                    } catch (DataIntegrityViolationException ex) {
                        return repo.findByIdempotencyKey(key).orElseThrow();
                    }
                });
    }

    public List<Expense> getExpenses(String category) {
        if (category == null || category.isBlank()) {
            return repo.findAllByOrderByDateDesc();
        }
        return repo.findByCategoryContainingIgnoreCaseOrderByDateDesc(category);
    }

    public Map<String, BigDecimal> getSummaryByCategory() {
        Map<String, BigDecimal> result = new HashMap<>();

        repo.findTotalPerCategory()
            .forEach(row ->
                result.put((String) row[0], (BigDecimal) row[1])
            );

        return result;
    }
}
