package com.project.service.impl;

import com.project.model.Product;
import com.project.model.Sale;
import com.project.model.SaleItem;
import com.project.repository.ProductRepository;
import com.project.repository.SaleItemRepository;
import com.project.repository.SaleRepository;
import com.project.service.SaleItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SaleItemServiceImpl implements SaleItemService {
    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private SaleItemRepository saleItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public SaleItem addProductToSale(Long saleId, Long productId) {
        Optional<Product> opt1 = productRepository.findById(productId);
        Optional<Sale> opt = saleRepository.findById(saleId);
        if (opt.isPresent()) {
            if (opt1.isPresent()) {
                SaleItem item = new SaleItem();
                item.setProduct(opt1.get());
                item.setStatus("REQUEST");
                item.setSale(opt.get());
                return saleItemRepository.save(item);
            }
        }
        return null;
    }

    @Override
    public SaleItem confirmProduct(Long saleItemId) {
        Optional<SaleItem> opt = saleItemRepository.findById(saleItemId);
        if(opt.isPresent()){
            SaleItem saleItem = opt.get();
            Optional<Sale> opt2 = saleRepository.findById(saleItem.getSale().getId());
                if(opt2.isPresent()) {
                    Optional<Product> opt1 = productRepository.findById(saleItem.getProduct().getId());
                    if (opt1.isPresent()) {
                        Product product = opt1.get();
                        product.setDiscountType(opt2.get().getDiscountType());
                        product.setDiscountNumber(opt2.get().getDiscountNumber());
                        productRepository.save(product);
                    }
            }
            saleItem.setStatus("AVAILABLE");
            return saleItemRepository.save(saleItem);
        }
        return null;
    }
    @Override
    public SaleItem denyProduct(Long saleItemId) {
        Optional<SaleItem> opt = saleItemRepository.findById(saleItemId);
        if(opt.isPresent()){
            SaleItem saleItem = opt.get();
            saleItem.setStatus("DENY");
            return saleItemRepository.save(saleItem);
        }
        return null;
    }
}
