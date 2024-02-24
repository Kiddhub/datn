package com.project.service;

import com.project.model.Product;
import com.project.model.SaleItem;

public interface SaleItemService {
    SaleItem addProductToSale(Long saleId, Long productId);

    SaleItem confirmProduct(Long saleItemId);

    SaleItem denyProduct(Long saleItemId);
}
