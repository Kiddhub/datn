package com.project.controller;

import com.project.dto.request.AddProductToCategoryShop;
import com.project.dto.request.CategoryShopRequest;
import com.project.dto.request.RemoveProductFromCategoryShop;
import com.project.dto.response.ApiResponse;
import com.project.exception.CategoryShopException;
import com.project.exception.UserException;
import com.project.model.CategoryShop;
import com.project.model.Product;
import com.project.model.Shop;
import com.project.model.User;
import com.project.repository.ShopRepository;
import com.project.service.CategoryShopService;
import com.project.service.ProductService;
import com.project.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shop/categoryShop")
@PreAuthorize("hasRole('SHOP')")
@RequiredArgsConstructor
public class CategoryShopController {
    private final UserService userService;
    private final ShopRepository shopRepository;
    private final CategoryShopService categoryShopService;
    private final ProductService productService;

    @PostMapping("/create")
    public ResponseEntity<CategoryShop> createCategoryShop(@RequestBody CategoryShopRequest req,
                                                           @RequestHeader("Authorization") String jwt) throws UserException {
        User user = userService.findUsernameByToken(jwt);
        Shop shop = shopRepository.findByUserId(user.getId());
        CategoryShop categoryShop = categoryShopService.createCategory(req,shop);
        return new ResponseEntity<>(categoryShop, HttpStatus.CREATED);
    }
    @DeleteMapping("/delete/{categoryShopId}")
    public ResponseEntity<ApiResponse> deleteCategoryShop(@PathVariable Long categoryShopId) throws CategoryShopException {
        categoryShopService.deleteCategoryShop(categoryShopId);
        ApiResponse res = new ApiResponse();
        res.setMessage("Delete successfully");
        res.setStatus(true);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }
    @PutMapping("/{categoryShopId}")
    public ResponseEntity<ApiResponse> updateStatus(@PathVariable Long categoryShopId){
        categoryShopService.updateStatusCategory(categoryShopId);
        ApiResponse res = new ApiResponse();
        res.setMessage("Update successfully");
        res.setStatus(true);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }
    @GetMapping("/")
    public ResponseEntity<List<CategoryShop>>getAllCategoryShop(@RequestHeader("Authorization") String jwt){
        User user = userService.findUsernameByToken(jwt);
        Shop shop = shopRepository.findByUserId(user.getId());
        List<CategoryShop> categoryShop = categoryShopService.getAllCategory(shop.getId());
        return new ResponseEntity<>(categoryShop,HttpStatus.OK);
    }
    @PutMapping("/update/{categoryShopId}")
    public ResponseEntity<CategoryShop> updateCategory(@RequestBody CategoryShopRequest req, @PathVariable Long categoryShopId) throws CategoryShopException {
        CategoryShop categoryShop = categoryShopService.updateCategory(req,categoryShopId);
        return new ResponseEntity<>(categoryShop,HttpStatus.OK);
    }
    @PostMapping("/products/new")
    public ResponseEntity<CategoryShop> addProductToCategory(@RequestBody AddProductToCategoryShop req){
        CategoryShop categoryShop = categoryShopService.addProductToCategoryShop(req);
        return new ResponseEntity<>(categoryShop,HttpStatus.CREATED);
    }

    @DeleteMapping("/products/delete")
    public ResponseEntity<CategoryShop> removeProductFromCategory(@RequestBody RemoveProductFromCategoryShop req){
        CategoryShop categoryShop = categoryShopService.removeProductFromCategoryShop(req);
        return new ResponseEntity<>(categoryShop,HttpStatus.OK);
    }
    @GetMapping("/products/{categoryShopId}")
    public ResponseEntity<List<Product>> getAllProductCategory(@PathVariable("categoryShopId")Long categoryShopId){
        List<Product> products = productService.getProductsByCategoryShop(categoryShopId);
        return new ResponseEntity<>(products,HttpStatus.OK);
    }
}
