package com.project.service;

import com.project.dto.request.CreateProductRequest;
import com.project.dto.request.SearchProductRequest;
import com.project.dto.request.UpdateProductRequest;
import com.project.dto.request.UpdateProductStatusRequest;
import com.project.exception.ProductException;
import com.project.model.Product;
import com.project.model.Shop;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    Product createProduct(CreateProductRequest req, Shop shop);
    void confirmProduct(Long productId) throws ProductException;
    Product findProduct(Long productId);
    List<Product> findProductByTag(String tag);
    List<Product> findProductsByNameAndStatus(Long shopId,String name,String status);
    void deniedProduct(Long productId) throws ProductException;
    List<Product> getAllProduct();
    List<Product> getAllProductFromShop(Long shopId) throws ProductException;
    Product updateProduct(UpdateProductRequest req, Long productId) throws ProductException;
    Product deleteProduct(Long productId) throws ProductException;
    List<Product> findProductsByCategory(Long categoryId);
    List<Product> filterProducts(Long categoryId, Double ratingValue);
    List<Product> getProductsByCategoryShop(Long categoryShopId);
    List<Product> userFindProducts(Long shopId);
    List<Product> findProductByNameAndShopId(String name,Long shopId);
    List<Product> findProductNotInSale(Long shopId, Long saleId);
    Product updateProductStatus(UpdateProductStatusRequest req, Long productId);
    List<Product> getAllAvailableProducts();
    List<Product> getAllProductByName(String name);
    List<Product> getAllProductByCategory(Long categoryId);
}
