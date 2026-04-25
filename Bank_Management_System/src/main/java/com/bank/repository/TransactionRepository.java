package com.bank.repository;

import com.bank.entity.TransactionDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionDetails, Integer> {
    List<TransactionDetails> findByAccountnumberOrderByTransactiondateDescTransactiontimeDesc(int accountnumber);
}
