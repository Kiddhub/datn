package com.project.service.impl;

import com.project.dto.request.CreateReportRequest;
import com.project.model.Product;
import com.project.model.Report;
import com.project.model.User;
import com.project.repository.ProductRepository;
import com.project.repository.ReportRepository;
import com.project.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
    private final ReportRepository reportRepository;
    private final ProductRepository productRepository;

    @Override
    public Report createReport(CreateReportRequest req, User user) {
        Optional<Product> opt = productRepository.findById(req.getProductId());
        if(opt.isPresent()){
            Report report = new Report();
            report.setReportType(req.getReportType());
            report.setUser(user);
            report.setProduct(opt.get());
            report.setMessage(req.getMessage());
            return reportRepository.save(report);
        }
        return null;
    }
    @Override
    public List<Report> getAllReport() {
        return reportRepository.findAll();
    }

    @Override
    public List<Report> getAllProductReport(Long productId) {
        return reportRepository.getProductReports(productId);
    }
}
