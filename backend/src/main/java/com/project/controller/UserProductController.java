package com.project.controller;

import com.project.model.Product;
import com.project.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/product")
public class UserProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/")
    public ResponseEntity<List<Product>> getAllProducts(){
        List<Product> products = productService.getAllAvailableProducts();
        return new ResponseEntity<>(products,HttpStatus.OK);
    }
    @GetMapping("/{categoryId}")
    public ResponseEntity<List<Product>> getProductByCategory(@PathVariable Long categoryId) {
        List<Product> products = productService.findProductsByCategory(categoryId);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/searchByTag")
    public ResponseEntity<List<Product>> getProductsByTag(@RequestParam(name ="tag")String tag){
        List<Product> products = productService.findProductByTag(tag);
        return new ResponseEntity<>(products,HttpStatus.OK);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Product>> filterProducts(
            @RequestParam(name = "categoryId", required = false) Long categoryId,
            @RequestParam(name = "ratingValue", required = false) Double ratingValue) {

        List<Product> products = productService.filterProducts(categoryId, ratingValue);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>>searchProductInShop(@RequestParam(name = "name",required = false)String name,
                                                            @RequestParam(name = "shopId") Long shopId){
        List<Product> products = productService.findProductByNameAndShopId(name,shopId);
        return new ResponseEntity<>(products,HttpStatus.OK);
    }

    @GetMapping("/details/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Long productId) {
        Product product = productService.findProduct(productId);
        return new ResponseEntity<Product>(product, HttpStatus.OK);
    }
    @GetMapping("/shop/{shopId}")
    public ResponseEntity<List<Product>> getProductByShopId(@PathVariable Long shopId) {
        List<Product> product = productService.userFindProducts(shopId);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/searchProduct")
    public ResponseEntity<List<Product>> getAllProductByName(@RequestParam(name = "name",required = false)String name){
        List<Product> products = productService.getAllProductByName(name);
        return new ResponseEntity<>(products,HttpStatus.OK);
    }

    @GetMapping("/search/{categoryId}")
    public ResponseEntity<List<Product>> getAllProductByCategory(@PathVariable(name = "categoryId")Long categoryId){
        List<Product> products = productService.getAllProductByCategory(categoryId);
        return new ResponseEntity<>(products,HttpStatus.OK);
    }
}
