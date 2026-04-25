package com.bank.controller;

import com.bank.entity.CustomerDetails;
import com.bank.entity.TransactionDetails;
import com.bank.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> registerCustomer(@RequestBody CustomerDetails customerDetails) {
        try {
            CustomerDetails registeredCustomer = customerService.registerCustomer(customerDetails);
            return new ResponseEntity<>(registeredCustomer, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginCustomer(@RequestParam String email, @RequestParam int pin) {
        try {
            CustomerDetails customer = customerService.loginCustomer(email, pin);
            return new ResponseEntity<>(customer, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/{accountNumber}/debit")
    public ResponseEntity<?> debitAmount(@PathVariable int accountNumber, @RequestParam double amount) {
        try {
            TransactionDetails transaction = customerService.debitAmount(accountNumber, amount);
            return new ResponseEntity<>(transaction, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{accountNumber}/credit")
    public ResponseEntity<?> creditAmount(@PathVariable Integer accountNumber, @RequestParam Double amount) {
        return ResponseEntity.ok(customerService.creditAmount(accountNumber, amount));
    }

    @PostMapping("/{accountNumber}/transfer")
    public ResponseEntity<?> transferAmount(@PathVariable Integer accountNumber, @RequestParam Integer toAccount, @RequestParam Double amount) {
        return ResponseEntity.ok(customerService.transferAmount(accountNumber, toAccount, amount));
    }

    @GetMapping("/{accountNumber}/balance")
    public ResponseEntity<?> getBalance(@PathVariable int accountNumber) {
        try {
            double balance = customerService.getBalance(accountNumber);
            return new ResponseEntity<>("Current Balance: " + balance, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{accountNumber}/statement")
    public ResponseEntity<?> getStatement(@PathVariable int accountNumber) {
        try {
            List<TransactionDetails> statement = customerService.getStatement(accountNumber);
            return new ResponseEntity<>(statement, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
