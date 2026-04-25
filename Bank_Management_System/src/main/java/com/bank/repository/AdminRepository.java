package com.bank.repository;

import com.bank.entity.AdminDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<AdminDetails, Integer> {
    AdminDetails findByAdminEmailidAndAdminPin(String adminEmailid, Integer adminPin);
}
