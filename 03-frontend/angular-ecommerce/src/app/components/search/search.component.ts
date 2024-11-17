import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {



  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  doSearch(value: string) {
    console.log(`value=${value}`);
    this.router.navigateByUrl( `search/${value}`);
    
  }

 


}
