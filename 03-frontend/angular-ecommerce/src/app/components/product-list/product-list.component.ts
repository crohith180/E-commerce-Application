import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId:number = 1;

  currentCategoryName: string = "";
  searchProducts: boolean = false;
  searchMessage:string = '';

  // new prop for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0; 

  previousKeyWord:string="";

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
   private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchProducts = this.route.snapshot.paramMap.has('keyword');
    if (this.searchProducts) {
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }

  }

  handleSearchProducts() {

    const theKeyword:string = this.route.snapshot.paramMap.get('keyword')!;

    //if we have different keyword than previous 
    // then set the thePageNumber to 1
    if (theKeyword !== this.previousKeyWord) {
      this.thePageNumber = 1;
    }

    this.previousKeyWord = theKeyword;
    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    this.productService.searchProductListPaginate(this.thePageNumber-1,
      this.thePageSize,
      theKeyword).subscribe(this.processResult());
  }

  handleListProducts() {

    //check if "id" parameter is available

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get the "id" param string,. convert string to a number using the "+ 'symbol"
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }
    else {
      //not category id available ... default to category id 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';

    }

    //
    // check if we have  a diff category than previous
    // NOte: angular will reuse a components if its currently being viewed
    //

    //if we have a different category id than previous
    // then reset the pageNumber back to 1
    if (this.currentCategoryId !== this.previousCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log( `currentCategoryId=${this.currentCategoryId}, thepageNumber=${this.thePageNumber}`)

    //now get the products for the given category id
    this.productService.getProductListPagination(this.thePageNumber-1,
                                                 this.thePageSize,
                                                 this.currentCategoryId)
                                                 .subscribe(this.processResult());

  }

  updatePageSize(pageSize:string){
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();

  }

  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number+1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;

    };
  }

  addToCart(theProduct: Product) {

    console.log(`Adding to cart:${theProduct.name}, ${theProduct.unitPrice}`);
    
    const theCartItem= new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
    
    }

  

}
