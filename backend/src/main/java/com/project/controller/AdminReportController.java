package com.project.controller;

import com.project.model.Report;
import com.project.service.ReportService;
import com.project.service.UserService;
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
@RequestMapping("/api/admin/report")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminReportController {
    private final UserService userService;
    private final ReportService reportService;
    @GetMapping("/")
    public ResponseEntity<List<Report>> getALlReports(){
        List<Report> reports = reportService.getAllReport();
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }
    @GetMapping("/{productId}")
    public ResponseEntity<List<Report>> getAllProductReports(@PathVariable("productId")Long productId){
        List<Report> reports = reportService.getAllProductReport(productId);
        return new ResponseEntity<>(reports,HttpStatus.OK);
    }
}