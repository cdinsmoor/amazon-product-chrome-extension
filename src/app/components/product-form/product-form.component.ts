import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AmazonProduct } from 'src/app/models/AmazonProduct';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  amazonProductForm: FormGroup;
  data: AmazonProduct;
  productReturned: boolean = false;
  add: boolean = true; 
  panelOpenState = true;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private dataService: DataService) { }

  ngOnInit() {
    this.createGroup();
    this.panelOpenState = true; 
  }

  createGroup() {
    this.amazonProductForm = this.formBuilder.group({
      brand_name: '',
      product_name: '',
      asin: '',
      product_categories: '',
      product_description: '',
      image: '',
      purchase_options: this.formBuilder.group({
        merchant: '',
        network: '',
        original_url: '',
        optimized_url: '',
        price: '',
        original_price: ''
      })
    });
  }

  updateForm() {
    this.amazonProductForm.patchValue({
      brand_name: this.data.brand_name,
      product_name: this.data.product_name,
      asin: this.data.asin,
      product_categories: this.data.product_categories,
      product_description: this.data.product_description,
      image: this.data.image,
    });
    this.amazonProductForm.controls.purchase_options.patchValue({
      merchant: this.data.soldBy,
      network: 'Amazon',
      original_url: this.data.original_url,
      optimized_url: this.data.optimized_url,
      price: this.data.price,
      original_price: this.data.original_price
    });
  }

  editForm(): void {
    this.add = false; 
  }

  updateProduct() {
    const r: AmazonProduct = Object.assign({}, this.amazonProductForm.value);
    this.data = r;
    this.add = true; 
  }

  cancelUpdate() {
    this.add = true;
  }

  getProduct(asin: string) {
    this.productReturned = false;

    this.dataService.getProduct(this.amazonProductForm.controls.asin.value).subscribe(result => {
      this.data = result;
      this.generateAfiiliateLink();
      this.updateForm();
      const r: AmazonProduct = Object.assign({}, this.amazonProductForm.value);
      this.data = r;
      this.panelOpenState = false; 
      this.productReturned = true;
    });
  }

  generateAfiiliateLink() {
    const tag: string = 'tag=biip_040319_hackathon-project-20';
    const linkCode: string = 'linkCode=as2';
    let affiliateLink: string = `${this.data.original_url}/ref=as_li_tl?ie=UTF8&camp=1789&creativeASIN=${this.data.asin}&${linkCode}&${tag}`;
    this.data.optimized_url = affiliateLink;
  }

  saveProduct() {
    this.dataService.saveProduct(this.data).subscribe();
    this.productReturned = false; 
    this.panelOpenState = true; 
  }

}
