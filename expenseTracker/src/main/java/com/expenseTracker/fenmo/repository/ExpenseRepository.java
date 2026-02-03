package com.expenseTracker.fenmo.repository;

import com.expenseTracker.fenmo.model.Expense;
import org.springframework.data.jpa.repository.*;
import java.math.BigDecimal;
import java.util.*;

public interface ExpenseRepository extends JpaRepository<Expense, UUID> {

    Optional<Expense> findByIdempotencyKey(String idempotencyKey);

    List<Expense> findAllByOrderByDateDesc();

    List<Expense> findByCategoryContainingIgnoreCaseOrderByDateDesc(String category);

    @Query("""
        SELECT e.category, SUM(e.amount)
        FROM Expense e
        GROUP BY e.category
    """)
    List<Object[]> findTotalPerCategory();
}
