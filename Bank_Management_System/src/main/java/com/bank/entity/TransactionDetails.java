package com.bank.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "transaction_details")
public class TransactionDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private int transactionid;

    @Column(name = "transaction_Date")
    private LocalDate transactiondate;

    @Column(name = "transaction_time")
    private LocalTime transactiontime;

    @Column(name = "transaction_Amount")
    private double transactionamount;

    @Column(name = "balance_Amount")
    private double balanceamount;

    @Column(name = "Customer_account_number")
    private int accountnumber;

    @Column(name = "Receiver_account_number")
    private int raccountnumber;

    @Column(name = "transaction_type")
    private String transactiontype;

    public TransactionDetails() {
    }

    public TransactionDetails(LocalDate transactiondate, LocalTime transactiontime,
            double transactionamount, double balanceamount, int accountnumber, int raccountnumber, String transactiontype) {
        this.transactiondate = transactiondate;
        this.transactiontime = transactiontime;
        this.transactionamount = transactionamount;
        this.balanceamount = balanceamount;
        this.accountnumber = accountnumber;
        this.raccountnumber = raccountnumber;
        this.transactiontype = transactiontype;
    }

    public int getTransactionid() {
        return transactionid;
    }

    public void setTransactionid(int transactionid) {
        this.transactionid = transactionid;
    }

    public LocalDate getTransactiondate() {
        return transactiondate;
    }

    public void setTransactiondate(LocalDate transactiondate) {
        this.transactiondate = transactiondate;
    }

    public LocalTime getTransactiontime() {
        return transactiontime;
    }

    public void setTransactiontime(LocalTime transactiontime) {
        this.transactiontime = transactiontime;
    }

    public double getTransactionamount() {
        return transactionamount;
    }

    public void setTransactionamount(double transactionamount) {
        this.transactionamount = transactionamount;
    }

    public double getBalanceamount() {
        return balanceamount;
    }

    public void setBalanceamount(double balanceamount) {
        this.balanceamount = balanceamount;
    }

    public int getAccountnumber() {
        return accountnumber;
    }

    public void setAccountnumber(int accountnumber) {
        this.accountnumber = accountnumber;
    }

    public int getRaccountnumber() {
        return raccountnumber;
    }

    public void setRaccountnumber(int raccountnumber) {
        this.raccountnumber = raccountnumber;
    }

    public String getTransactiontype() {
        return transactiontype;
    }

    public void setTransactiontype(String transactiontype) {
        this.transactiontype = transactiontype;
    }
}
