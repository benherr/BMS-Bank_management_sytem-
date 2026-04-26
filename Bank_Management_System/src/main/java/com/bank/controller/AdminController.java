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

    @Autowired
    private com.bank.service.CustomerService customerService;

    @GetMapping("/seed-kerala")
    public ResponseEntity<String> seedKeralaData() {
        transactionRepository.deleteAll();
        customerRepository.deleteAll();
        
        // Helper function to register and add initial deposit
        seedUser("Anoop Menon", "anoop@gmail.com", 456789123456L, "ANP1234M", 9846012345L, "Kochi, Kerala", "Male", "1985-05-12", 38, 5000.0);
        seedUser("Lakshmi Nair", "lakshmi@gmail.com", 789123456123L, "LKM9876N", 9447012345L, "Trivandrum, Kerala", "Female", "1992-08-24", 31, 8000.0);
        seedUser("Fahadh Faasil", "fahadh@gmail.com", 123456789123L, "FHD4567F", 9020012345L, "Alappuzha, Kerala", "Male", "1988-11-05", 35, 12000.0);
        seedUser("Nithya Menen", "nithya@gmail.com", 321654987123L, "NTH3210M", 9895012345L, "Kozhikode, Kerala", "Female", "1995-02-14", 29, 6500.0);
        seedUser("Dulquer Salmaan", "dulquer@gmail.com", 654987321123L, "DLQ6543S", 9995012345L, "Thrissur, Kerala", "Male", "1990-07-28", 33, 15000.0);
        
        return ResponseEntity.ok("Successfully deleted old data and seeded 5 Kerala users with opening deposit transactions!");
    }

    @GetMapping("/setup-admin")
    public ResponseEntity<String> setupAdmin() {
        AdminDetails admin = adminRepository.findByAdminEmailidAndAdminPin("admin@bank.com", "1234");
        if (admin == null) {
            AdminDetails newAdmin = new AdminDetails(1, "admin@bank.com", "1234");
            adminRepository.save(newAdmin);
            return ResponseEntity.ok("Admin account created successfully! You can now log in with email 'admin@bank.com' and pin '1234'.");
        }
        return ResponseEntity.ok("Admin account already exists!");
    }

    private void seedUser(String name, String email, long aadhar, String pan, long mobile, String address, String gender, String dob, int age, double initialDeposit) {
        CustomerDetails newCustomer = customerService.registerCustomer(
            new CustomerDetails(0, name, email, aadhar, pan, mobile, address, gender, java.sql.Date.valueOf(dob), age, 0.0, 0, 0)
        );
        // Force test PIN for seeded users
        newCustomer.setPin(1234);
        customerRepository.save(newCustomer);
        
        customerService.creditAmount(newCustomer.getAccountnumber(), initialDeposit);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String pin) {
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
