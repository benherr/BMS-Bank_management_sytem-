package com.bank.service;

import com.bank.entity.CustomerDetails;
import com.bank.entity.TransactionDetails;
import com.bank.repository.CustomerRepository;
import com.bank.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    private int generateAccountNumber() {
        Random rnd = new Random();
        return 100000 + rnd.nextInt(900000);
    }

    public CustomerDetails registerCustomer(CustomerDetails customerDetails) {
        if (customerDetails.getCustomeremailid() == null || !customerDetails.getCustomeremailid().contains("@gmail.com")) {
            throw new IllegalArgumentException("Invalid Email ID");
        }
        
        customerDetails.setAccountnumber(generateAccountNumber());
        customerDetails.setPin(1234);
        
        return customerRepository.save(customerDetails);
    }

    public CustomerDetails loginCustomer(String email, int pin) {
        Optional<CustomerDetails> customerOpt = customerRepository.findByCustomeremailidAndPin(email, pin);
        if (customerOpt.isPresent()) {
            return customerOpt.get();
        } else {
            throw new IllegalArgumentException("Invalid email or PIN");
        }
    }

    @Transactional
    public TransactionDetails debitAmount(int accountNumber, double amount) {
        Optional<CustomerDetails> customerOpt = customerRepository.findByAccountnumber(accountNumber);
        
        if (customerOpt.isPresent()) {
            CustomerDetails customer = customerOpt.get();
            double dbAmount = customer.getAmount();
            
            if (amount <= dbAmount) {
                double balanceAmount = dbAmount - amount;
                customer.setAmount(balanceAmount);
                customerRepository.save(customer);
                
                TransactionDetails transaction = new TransactionDetails(
                        LocalDate.now(),
                        LocalTime.now(),
                        amount,
                        balanceAmount,
                        accountNumber,
                        accountNumber,
                        "debit"
                );
                
                return transactionRepository.save(transaction);
            } else {
                throw new IllegalArgumentException("Insufficient amount");
            }
        } else {
            throw new IllegalArgumentException("Invalid account number");
        }
    }

    @Transactional
    public TransactionDetails creditAmount(int accountNumber, double amount) {
        Optional<CustomerDetails> customerOpt = customerRepository.findByAccountnumber(accountNumber);
        
        if (customerOpt.isPresent()) {
            CustomerDetails customer = customerOpt.get();
            double balanceAmount = customer.getAmount() + amount;
            customer.setAmount(balanceAmount);
            customerRepository.save(customer);
            
            TransactionDetails transaction = new TransactionDetails(
                    LocalDate.now(),
                    LocalTime.now(),
                    amount,
                    balanceAmount,
                    accountNumber,
                    accountNumber,
                    "credit"
            );
            
            return transactionRepository.save(transaction);
        } else {
            throw new IllegalArgumentException("Invalid account number");
        }
    }

    public double getBalance(int accountNumber) {
        Optional<CustomerDetails> customerOpt = customerRepository.findByAccountnumber(accountNumber);
        if (customerOpt.isPresent()) {
            return customerOpt.get().getAmount();
        } else {
            throw new IllegalArgumentException("Invalid account number");
        }
    }

    public List<TransactionDetails> getStatement(int accountNumber) {
        return transactionRepository.findByAccountnumberOrderByTransactiondateDescTransactiontimeDesc(accountNumber);
    }
}
