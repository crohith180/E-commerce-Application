package com.luv2code.spring_boot_ecommerce.Entity.dao;

import com.luv2code.spring_boot_ecommerce.Entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Customer findByEmail(String theEmail);

}
