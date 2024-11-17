import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  theTotalPrice: number = 0.00;
  theTotalQuantity: number = 0;


  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.updateCartService();
  }

  updateCartService() {

    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.theTotalPrice = data
    );

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.theTotalQuantity = data
    );

  }

}
