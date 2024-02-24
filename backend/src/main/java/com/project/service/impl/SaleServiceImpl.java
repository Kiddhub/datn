package com.project.service.impl;

import com.project.dto.request.CreateSaleRequest;
import com.project.exception.SaleException;
import com.project.model.Sale;
import com.project.repository.SaleRepository;
import com.project.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SaleServiceImpl implements SaleService {
    @Autowired
    private SaleRepository saleRepository;
    @Override
    public Sale createSale(CreateSaleRequest req) {
        Sale sale = new Sale();
        sale.setName(req.getName());
        sale.setDescription(req.getDescription());
        sale.setDiscountType(req.getDiscountType());
        sale.setDiscountNumber(req.getDiscountNumber());
        sale.setTimeStart(LocalDateTime.parse(req.getTimeStart()));
        sale.setTimeEnd(LocalDateTime.parse(req.getTimeEnd()));
        sale.setStatus("AVAILABLE");
        saleRepository.save(sale);
        return sale;
    }
    @Override
    public List<Sale> getAllSale() {
        return saleRepository.findAll();
    }

    @Override
    public Sale updateStatus(Long saleId) throws SaleException {
        Optional<Sale> sale = saleRepository.findById(saleId);
        if(sale.isPresent()){
            Sale sale1 = sale.get();
            if(sale1.getStatus().equals("AVAILABLE")){
                sale1.setStatus("HIDE");
                saleRepository.save(sale1);
                return sale1;
            }else if(sale1.getStatus().equals("HIDE")) {
                sale1.setStatus("AVAILABLE");
                saleRepository.save(sale1);
                return sale1;
            }
        }else throw new SaleException("SALE ID NOT FOUND");
        return null;
    }

    @Override
    public Sale updateSale(Long saleId, CreateSaleRequest req) {
        Optional<Sale> opt = saleRepository.findById(saleId);
        if(opt.isPresent()){
            Sale sale = opt.get();
            sale.setName(req.getName());
            sale.setDescription(req.getDescription());
            sale.setDiscountType(req.getDiscountType());
            sale.setDiscountNumber(req.getDiscountNumber());
            sale.setTimeStart(LocalDateTime.parse(req.getTimeStart()));
            sale.setTimeEnd(LocalDateTime.parse(req.getTimeEnd()));
            return saleRepository.save(sale);
        }
        return null;
    }

}
