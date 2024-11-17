package com.luv2code.spring_boot_ecommerce.Entity.dto;

import com.luv2code.spring_boot_ecommerce.Entity.Address;
import com.luv2code.spring_boot_ecommerce.Entity.Customer;
import com.luv2code.spring_boot_ecommerce.Entity.Order;
import com.luv2code.spring_boot_ecommerce.Entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;


    private Address shippingAddress;


    private Address billingAddress;


    private Order order;


    private Set<OrderItem> orderItems;
}
