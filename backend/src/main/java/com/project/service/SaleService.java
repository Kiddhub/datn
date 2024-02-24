package com.project.service;

import com.project.dto.request.CreateSaleRequest;
import com.project.exception.SaleException;
import com.project.model.Product;
import com.project.model.Sale;

import java.util.List;

public interface SaleService {
    Sale createSale(CreateSaleRequest req);

    List<Sale> getAllSale();

    Sale updateStatus(Long saleId) throws SaleException;

    Sale updateSale(Long saleId, CreateSaleRequest req);

}
