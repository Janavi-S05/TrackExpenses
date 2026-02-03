package com.expenseTracker.fenmo.controller;

import com.expenseTracker.fenmo.dto.CreateExpenseRequest;
import com.expenseTracker.fenmo.model.Expense;
import com.expenseTracker.fenmo.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {

    private final ExpenseService service;

    public ExpenseController(ExpenseService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Expense> create(
            @RequestHeader("Idempotency-Key") String key,
            @Valid @RequestBody CreateExpenseRequest req
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.createExpense(req, key));
    }

    @GetMapping
    public List<Expense> list(
            @RequestParam(required = false) String category
    ) {
        return service.getExpenses(category);
    }

    @GetMapping("/summary")
    public Map<String, BigDecimal> summary() {
        return service.getSummaryByCategory();
    }
}
