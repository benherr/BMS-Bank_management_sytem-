package com.bank.repository;

import com.bank.entity.CustomerDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<CustomerDetails, Integer> {
    Optional<CustomerDetails> findByCustomeremailidAndPin(String customeremailid, int pin);
    Optional<CustomerDetails> findByAccountnumber(int accountnumber);
}
