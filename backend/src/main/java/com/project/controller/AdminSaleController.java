package com.project.controller;

import com.project.dto.request.CreateSaleRequest;
import com.project.exception.SaleException;
import com.project.model.Sale;
import com.project.model.SaleItem;
import com.project.service.SaleItemService;
import com.project.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/sale")
public class AdminSaleController {
    @Autowired
    private SaleService saleService;
    @Autowired
    private SaleItemService saleItemService;
    @GetMapping("/")
    @PreAuthorize("hasRole('ADMIN') || hasRole('SHOP') || hasRole('USER')")
    public ResponseEntity<List<Sale>> getAllSale() {
        List<Sale> saleList = saleService.getAllSale();
        return new ResponseEntity<>(saleList, HttpStatus.OK);
    }
    @PostMapping("/new")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Sale> createSale(@RequestBody CreateSaleRequest req){
        Sale sale = saleService.createSale(req);
        return new ResponseEntity<>(sale, HttpStatus.CREATED);
    }
    @PutMapping("/update/{saleId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Sale> updateStatusSale(@PathVariable Long saleId) throws SaleException {
        Sale sale = saleService.updateStatus(saleId);
        return new ResponseEntity<>(sale,HttpStatus.OK);
    }
    @PutMapping("/{saleId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Sale> updateSale(@PathVariable Long saleId,
                                           @RequestBody CreateSaleRequest request){
        Sale sale = saleService.updateSale(saleId,request);
        return new ResponseEntity<>(sale,HttpStatus.OK);
    }
    @PutMapping("/sale_items/confirm/{saleItemId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SaleItem> confirmSaleItem(@PathVariable Long saleItemId){
        SaleItem saleItem = saleItemService.confirmProduct(saleItemId);
        return new ResponseEntity<>(saleItem,HttpStatus.OK);
    }
    @PutMapping("/sale_items/deny/{saleItemId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SaleItem> denySaleItem(@PathVariable Long saleItemId){
        SaleItem saleItem = saleItemService.denyProduct(saleItemId);
        return new ResponseEntity<>(saleItem,HttpStatus.OK);
    }
    @PutMapping("/test")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> test() {
        return new ResponseEntity<>("hi",HttpStatus.OK);
    }

}
