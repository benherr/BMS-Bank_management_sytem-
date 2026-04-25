package com.bank.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import java.sql.Date;

@Entity
@Table(name = "customer_details")
public class CustomerDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customerid")
    private int customerid;
    
    @Column(name = "customer_name")
    private String customername;
    
    @Column(name = "customer_emailid", unique = true)
    private String customeremailid;
    
    @Column(name = "aadhar_number", unique = true)
    private long aadharnumber;
    
    @Column(name = "pan_number", unique = true)
    private String pannumber;
    
    @Column(name = "mobile_number")
    private long mobilenumber;
    
    @Column(name = "customer_address")
    private String customeraddress;
    
    @Column(name = "gender")
    private String gender;
    
    @Column(name = "Date_Of_Birth")
    private Date dateofbirth;
    
    @Column(name = "customer_age")
    private int customerage;
    
    @Column(name = "Amount")
    private double amount;
    
    @Column(name = "Account_number", unique = true)
    private int accountnumber;
    
    @Column(name = "pin")
    private int pin;

    public CustomerDetails() {}

    public CustomerDetails(int customerid, String customername, String customeremailid, long aadharnumber,
            String pannumber, long mobilenumber, String customeraddress, String gender, Date dateofbirth,
            int customerage, double amount, int accountnumber, int pin) {
        this.customerid = customerid;
        this.customername = customername;
        this.customeremailid = customeremailid;
        this.aadharnumber = aadharnumber;
        this.pannumber = pannumber;
        this.mobilenumber = mobilenumber;
        this.customeraddress = customeraddress;
        this.gender = gender;
        this.dateofbirth = dateofbirth;
        this.customerage = customerage;
        this.amount = amount;
        this.accountnumber = accountnumber;
        this.pin = pin;
    }

    public int getCustomerid() {
        return customerid;
    }

    public void setCustomerid(int customerid) {
        this.customerid = customerid;
    }

    public String getCustomername() {
        return customername;
    }

    public void setCustomername(String customername) {
        this.customername = customername;
    }

    public String getCustomeremailid() {
        return customeremailid;
    }

    public void setCustomeremailid(String customeremailid) {
        this.customeremailid = customeremailid;
    }

    public long getAadharnumber() {
        return aadharnumber;
    }

    public void setAadharnumber(long aadharnumber) {
        this.aadharnumber = aadharnumber;
    }

    public String getPannumber() {
        return pannumber;
    }

    public void setPannumber(String pannumber) {
        this.pannumber = pannumber;
    }

    public long getMobilenumber() {
        return mobilenumber;
    }

    public void setMobilenumber(long mobilenumber) {
        this.mobilenumber = mobilenumber;
    }

    public String getCustomeraddress() {
        return customeraddress;
    }

    public void setCustomeraddress(String customeraddress) {
        this.customeraddress = customeraddress;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getDateofbirth() {
        return dateofbirth;
    }

    public void setDateofbirth(Date dateofbirth) {
        this.dateofbirth = dateofbirth;
    }

    public int getCustomerage() {
        return customerage;
    }

    public void setCustomerage(int customerage) {
        this.customerage = customerage;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public int getAccountnumber() {
        return accountnumber;
    }

    public void setAccountnumber(int accountnumber) {
        this.accountnumber = accountnumber;
    }

    public int getPin() {
        return pin;
    }

    public void setPin(int pin) {
        this.pin = pin;
    }
}
