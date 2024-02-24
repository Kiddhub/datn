package com.project.service;

import com.project.dto.request.CreateReportRequest;
import com.project.model.Report;
import com.project.model.User;

import java.util.List;

public interface ReportService {

    Report createReport(CreateReportRequest req, User user);

    List<Report> getAllReport();

    List<Report> getAllProductReport(Long productId);
}
