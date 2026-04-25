package com.bank.controller;

import com.bank.entity.CustomerDetails;
import com.bank.entity.TransactionDetails;
import com.bank.repository.CustomerRepository;
import com.bank.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping("/customers")
    public List<CustomerDetails> getAllCustomers() {
        return customerRepository.findAll();
    }

    @GetMapping("/transactions")
    public List<TransactionDetails> getAllTransactions() {
        return transactionRepository.findAll();
    }
}
