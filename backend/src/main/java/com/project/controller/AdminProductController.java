package com.project.controller;

import com.project.dto.request.UpdateProductStatusRequest;
import com.project.dto.response.ApiResponse;
import com.project.exception.ProductException;
import com.project.model.Product;
import com.project.service.ProductService;
import com.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/product/")
@PreAuthorize("hasRole('ADMIN')")
public class AdminProductController {
    @Autowired
    private ProductService productService;
    @Autowired
    private UserService userService;
    @PutMapping("/confirm/accept/{productId}")
    public ResponseEntity<ApiResponse> confirmProduct(
            @PathVariable Long productId) throws ProductException {
        productService.confirmProduct(productId);
        ApiResponse res =new ApiResponse();
        res.setMessage("Confirm Successfully");
        res.setStatus(true);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }
    @PutMapping("/confirm/denied/{productId}")
    public ResponseEntity<ApiResponse> denyProduct(
            @PathVariable Long productId) throws ProductException {
        productService.deniedProduct(productId);
        ApiResponse res =new ApiResponse();
        res.setMessage("Denied Successfully");
        res.setStatus(true);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }
    @GetMapping("/")
    public ResponseEntity<List<Product>> getAllProduct(){
        List<Product> products = productService.getAllProduct();
        return new ResponseEntity<>(products,HttpStatus.OK);
    }
    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateStatusProduct(@RequestBody UpdateProductStatusRequest req,
                                                       @PathVariable("productId")Long productId){
        Product product = productService.updateProductStatus(req,productId);
        return new ResponseEntity<>(product,HttpStatus.OK);
    }
}
