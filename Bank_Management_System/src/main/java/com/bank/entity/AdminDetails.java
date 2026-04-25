package com.bank.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "admin")
public class AdminDetails {

    @Id
    @Column(name = "admin_id")
    private int adminId;

    @Column(name = "admin_emailid", unique = true)
    private String adminEmailid;

    @Column(name = "admin_pin")
    private int adminPin;

    public AdminDetails() {}

    public AdminDetails(int adminId, String adminEmailid, int adminPin) {
        this.adminId = adminId;
        this.adminEmailid = adminEmailid;
        this.adminPin = adminPin;
    }

    public int getAdminId() {
        return adminId;
    }

    public void setAdminId(int adminId) {
        this.adminId = adminId;
    }

    public String getAdminEmailid() {
        return adminEmailid;
    }

    public void setAdminEmailid(String adminEmailid) {
        this.adminEmailid = adminEmailid;
    }

    public int getAdminPin() {
        return adminPin;
    }

    public void setAdminPin(int adminPin) {
        this.adminPin = adminPin;
    }
}
