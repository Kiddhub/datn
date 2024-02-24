package com.project.service;

import com.project.dto.request.AddProductToCategoryShop;
import com.project.dto.request.CategoryRequest;
import com.project.dto.request.CategoryShopRequest;
import com.project.dto.request.RemoveProductFromCategoryShop;
import com.project.exception.CategoryShopException;
import com.project.exception.ShopException;
import com.project.model.CategoryShop;
import com.project.model.Product;
import com.project.model.Shop;

import java.util.List;

public interface CategoryShopService {
    CategoryShop createCategory(CategoryShopRequest req, Shop shop);
    void deleteCategoryShop(Long categoryShopId) throws CategoryShopException;
    List<CategoryShop> getAllCategory(Long shopId);
    void updateStatusCategory(Long categoryShopId);
    CategoryShop updateCategory(CategoryShopRequest req, Long categoryShopId) throws CategoryShopException;
    CategoryShop addProductToCategoryShop(AddProductToCategoryShop req);
    CategoryShop removeProductFromCategoryShop(RemoveProductFromCategoryShop req);
}
