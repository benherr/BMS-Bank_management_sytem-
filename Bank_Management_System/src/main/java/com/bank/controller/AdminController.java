package com.bank.controller;

import com.bank.entity.CustomerDetails;
import com.bank.entity.TransactionDetails;
import com.bank.entity.AdminDetails;
import com.bank.repository.CustomerRepository;
import com.bank.repository.TransactionRepository;
import com.bank.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam Integer pin) {
        AdminDetails admin = adminRepository.findByAdminEmailidAndAdminPin(email, pin);
        if (admin != null) {
            return ResponseEntity.ok(admin);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Administrator Credentials");
        }
    }

    @GetMapping("/customers")
    public List<CustomerDetails> getAllCustomers() {
        return customerRepository.findAll();
    }

    @GetMapping("/transactions")
    public List<TransactionDetails> getAllTransactions() {
        return transactionRepository.findAll();
    }
}
