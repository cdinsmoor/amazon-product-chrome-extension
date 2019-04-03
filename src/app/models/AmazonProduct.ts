import { AmazonPurchaseOption } from './AmazonPurchaseOption';

export interface AmazonProduct {
    asin: string;
    manufacturer: string,
    brand_name: string;
    product_name: string; 
    price: string;
    original_price: string; 
    inStock: string; 
    product_description: string;
    product_categories: string; 
    soldBy: string;
    image: string; 
    original_url: string; 
    optimized_url: string; 
    purchase_options: AmazonPurchaseOption; 
}
