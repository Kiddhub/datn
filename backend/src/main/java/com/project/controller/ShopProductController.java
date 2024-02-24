package com.project.controller;

import com.project.dto.request.CreateProductRequest;
import com.project.dto.request.UpdateProductRequest;
import com.project.dto.request.UpdateProductStatusRequest;
import com.project.exception.ProductException;
import com.project.exception.ShopException;
import com.project.exception.UserException;
import com.project.model.Product;
import com.project.model.Shop;
import com.project.model.User;
import com.project.repository.ShopRepository;
import com.project.service.ProductService;
import com.project.service.ShopService;
import com.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/shop/product")
@PreAuthorize("hasRole('SHOP')")
public class ShopProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Autowired
    private ShopService shopService;

    @Autowired
    private ShopRepository shopRepository;

    @PostMapping("/create")
    public ResponseEntity<Product> createdProduct(@RequestBody CreateProductRequest req,
                                                  @RequestHeader("Authorization")String jwt) throws UserException, ShopException{
        User user = userService.findUsernameByToken(jwt);
        Shop shop = shopRepository.findByUserId(user.getId());
        Product product = productService.createProduct(req,shop);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }
    @GetMapping("/")
    public ResponseEntity<List<Product>> getAllShopProducts(@RequestHeader("Authorization")String header) throws ProductException {
        User user = userService.findUsernameByToken(header);
        Shop shop = shopService.findShopByUser(user.getId());
        List<Product> products = productService.getAllProductFromShop(shop.getId());
        return new ResponseEntity<>(products,HttpStatus.ACCEPTED);
    }

    @PutMapping("/update/{productId}")
    public ResponseEntity<Product> updateProduct(@RequestBody UpdateProductRequest req,
                                                 @PathVariable Long productId) throws ProductException {
        Product product = productService.updateProduct(req, productId);
        return new ResponseEntity<>(product,HttpStatus.OK);
    }

    @PutMapping("/delete/{productId}")
    public ResponseEntity<Product> deleteProduct(@RequestHeader("Authorization")String jwt,
                                                 @PathVariable Long productId) throws ProductException{
        Product product = productService.deleteProduct(productId);
        return new ResponseEntity<>(product,HttpStatus.OK);
    }
    @GetMapping("/filter")
    public ResponseEntity<List<Product>> findProductShop(@RequestHeader("Authorization")String jwt,
                                                         @RequestParam(name = "name",required = false)String name,
                                                         @RequestParam(name = "status",required = false)String status) throws UserException {
        User user = userService.findUsernameByToken(jwt);
        Shop shop = shopRepository.findByUserId(user.getId());
        List<Product> products = productService.findProductsByNameAndStatus(shop.getId(),name,status);
        return new ResponseEntity<>(products,HttpStatus.OK);
    }
    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateProductStatus(@PathVariable Long productId,
                                                       @RequestBody UpdateProductStatusRequest req){
            Product product = productService.updateProductStatus(req,productId);
            return new ResponseEntity<>(product,HttpStatus.OK);

    }
}
