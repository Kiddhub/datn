package com.project.service.impl;

import com.project.dto.request.CreateProductRequest;
import com.project.dto.request.SearchProductRequest;
import com.project.dto.request.UpdateProductRequest;
import com.project.dto.request.UpdateProductStatusRequest;
import com.project.exception.ProductException;
import com.project.model.Category;
import com.project.model.Product;
import com.project.model.Shop;
import com.project.repository.CategoryRepository;
import com.project.repository.ProductRepository;
import com.project.repository.ShopRepository;
import com.project.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ShopRepository shopRepository;

    @Override
    public Product createProduct(CreateProductRequest req, Shop shop) {
        Product product = new Product();
        product.setName(req.getName());
        product.setDescription(req.getDescription());
        product.setSizes(req.getSizes());
        product.setTags(req.getTags());
        product.setImageUrl(req.getImageUrl());
        product.setStatus("REQUEST");
        product.setShop(shop);
        Category topLevel = categoryRepository.findByName(req.getTopLevelCategory());
        Category secondLevel = categoryRepository.findByNameAndParent(req.getSecondLevelCategory(), topLevel.getName());
        if(secondLevel !=null){
            Category thirdLevel = categoryRepository.findByNameAndParent(req.getThirdLevelCategory(), secondLevel.getName());
            product.setCategory(Objects.requireNonNullElse(thirdLevel, secondLevel));
        }else {
            product.setCategory(topLevel);
        }
        return productRepository.save(product);
    }

    @Override
    public void confirmProduct(Long productId) throws ProductException {
        Optional<Product> opt = productRepository.findById(productId);
        if(opt.isPresent()){
            Product product = opt.get();
            product.setStatus("AVAILABLE");
            productRepository.save(product);
            return;
        }
        throw new ProductException("Product not found with ID");
    }

    @Override
    public Product findProduct(Long productId) {
        Optional<Product> opt = productRepository.findById(productId);
        if(opt.isPresent()){
            return opt.get();
        }else {
            return null;
        }
    }

    @Override
    public List<Product> findProductByTag(String tag) {
        return productRepository.findByTag(tag);
    }


    @Override
    public List<Product> findProductsByNameAndStatus(Long shopId, String name,String status) {
        return productRepository.findByNameAndStatus(shopId,name, status);
    }

    @Override
    public void deniedProduct(Long productId) throws ProductException {
        Optional<Product> opt = productRepository.findById(productId);
        if(opt.isPresent()){
            Product product = opt.get();
            product.setStatus("DENY");
            productRepository.save(product);
            return;
        }
        throw new ProductException("Product not found with ID");
    }

    @Override
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }


    @Override
    public List<Product> getAllProductFromShop(Long shopId) throws ProductException {
        return productRepository.findByShopId(shopId);
    }
    @Override
    public Product updateProduct(UpdateProductRequest req, Long productId) throws ProductException {
        Optional<Product> opt = productRepository.findById(productId);
        if(opt.isPresent()){
            Product product = opt.get();
            product.setName(req.getName());
            product.setDescription(req.getDescription());
            product.setSizes(req.getSizes());
            product.setImageUrl(req.getImageUrl());
            product.setTags(req.getTags());
            return productRepository.save(product);
        }else {
            throw new ProductException("ProductId not found");
        }
    }

    @Override
    public Product deleteProduct(Long productId) throws ProductException {
        Optional<Product> opt = productRepository.findById(productId);
        if(opt.isPresent()){
            Product product = opt.get();
            product.setStatus("DELETED");
            return productRepository.save(product);
        }
        else {
            throw new ProductException("Product not found with ID");
        }
    }

    @Override
    public List<Product> findProductsByCategory(Long categoryId) {
        return productRepository.findProductByCategory(categoryId);
    }

    @Override
    public List<Product> filterProducts(Long categoryId, Double ratingValue) {
        return productRepository.findProductByRatingAndSubCategory(categoryId,ratingValue);
    }

    @Override
    public List<Product> getProductsByCategoryShop(Long categoryShopId) {
        return productRepository.findByCategoryShop(categoryShopId);
    }
    @Override
    public List<Product> userFindProducts(Long shopId) {
        return productRepository.userFindByShopId(shopId);
    }
    @Override
    public List<Product> findProductByNameAndShopId(String name, Long shopId) {
        return productRepository.findProductByNameAndShopId(name,shopId);
    }
    @Override
    public List<Product> findProductNotInSale(Long shopId, Long saleId) {
        return productRepository.findAvailableProductsByShopIdNotInSale(shopId,saleId);
    }
    @Override
    public Product updateProductStatus(UpdateProductStatusRequest req, Long productId) {
        Optional<Product> opt = productRepository.findById(req.getProductId());
        if(opt.isPresent()) {
            Product product = opt.get();
            product.setStatus(req.getStatus());
            return productRepository.save(product);
        }
        return null;
    }

    @Override
    public List<Product> getAllAvailableProducts() {
        return productRepository.findAllProductsAvailable();
    }

    @Override
    public List<Product> getAllProductByName(String name) {
        return productRepository.findByName(name);
    }

    @Override
    public List<Product> getAllProductByCategory(Long categoryId) {
        return productRepository.findProductByCategory(categoryId);
    }
}
