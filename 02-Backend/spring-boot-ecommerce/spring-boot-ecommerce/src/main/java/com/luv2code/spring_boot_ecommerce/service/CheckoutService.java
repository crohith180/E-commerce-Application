package com.luv2code.spring_boot_ecommerce.service;

import com.luv2code.spring_boot_ecommerce.Entity.dto.Purchase;
import com.luv2code.spring_boot_ecommerce.Entity.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
