package com.luv2code.spring_boot_ecommerce.controller;

import com.luv2code.spring_boot_ecommerce.Entity.dto.Purchase;
import com.luv2code.spring_boot_ecommerce.Entity.dto.PurchaseResponse;
import com.luv2code.spring_boot_ecommerce.service.CheckoutService;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder (@RequestBody Purchase purchase) {
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }

}
