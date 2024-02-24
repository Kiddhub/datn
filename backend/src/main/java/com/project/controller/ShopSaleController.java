package com.project.controller;

import com.project.dto.request.SaleItemRequest;
import com.project.model.Product;
import com.project.model.SaleItem;
import com.project.model.Shop;
import com.project.model.User;
import com.project.repository.ShopRepository;
import com.project.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shop/sale/sale_items")
@PreAuthorize("hasRole('SHOP')")
public class ShopSaleController {
    @Autowired
    private SaleService saleService;
    @Autowired
    private SaleItemService saleItemService;
    @Autowired
    private ProductService productService;
    @Autowired
    private ShopRepository shopRepository;
    @Autowired
    private UserService userService;
    @PostMapping("/new")
    public ResponseEntity<SaleItem> addProductToSale(@RequestBody SaleItemRequest request){
        SaleItem saleItem = saleItemService.addProductToSale(request.getSaleId(), request.getProductId());
        return new ResponseEntity<>(saleItem, HttpStatus.CREATED);
    }
    @GetMapping("/")
    public ResponseEntity<String> test(){
        return new ResponseEntity<>("hihi",HttpStatus.OK);
    }
    @GetMapping("/{saleId}")
    public ResponseEntity<List<Product>> getAllProductNotInSale(@RequestHeader("Authorization")String jwt,
                                                                @PathVariable Long saleId){
        User user = userService.findUsernameByToken(jwt);
        Shop shop = shopRepository.findByUserId(user.getId());
        List<Product> products = productService.findProductNotInSale(shop.getId(), saleId);
        return new ResponseEntity<>(products,HttpStatus.OK);
    }
}
