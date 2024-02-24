package com.project.controller;


import com.project.model.Report;
import com.project.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/shop/report")
@RequiredArgsConstructor
@PreAuthorize("hasRole('SHOP')")
public class ShopReportController {
    private final ReportService reportService;
    @GetMapping("/{productId}")
    public ResponseEntity<List<Report>> getProductReport(@PathVariable("productId") Long productId){
        List<Report> reports = reportService.getAllProductReport(productId);
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }
}
