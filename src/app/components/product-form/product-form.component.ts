import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AmazonProduct } from 'src/app/models/AmazonProduct';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  amazonProductForm: FormGroup;
  data: AmazonProduct;
  productReturned: boolean = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private dataService: DataService) { }

  ngOnInit() {
    this.createGroup();
  }

  createGroup() {
    this.amazonProductForm = this.formBuilder.group({
      asin: '',
      manufacturer: '',
      brand_name: '',
      product_name: '',
      price: '',
      original_price: '',
      inStock: '',
      description: '',
      soldBy: '',
      image: ''
    });
  }

  getProduct(asin: string) {
    const result: AmazonProduct = Object.assign({}, this.amazonProductForm.value);
    this.data = result;
    this.dataService.getProduct(this.data.asin).subscribe(result => {
      result.asin = asin;
      this.data = result;
      this.productReturned = true;
    });

  }


}
