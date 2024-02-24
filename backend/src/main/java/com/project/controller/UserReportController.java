package com.project.controller;

import com.project.dto.request.CreateReportRequest;
import com.project.model.Report;
import com.project.model.User;
import com.project.service.ReportService;
import com.project.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/report")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class UserReportController {
    private final ReportService reportService;
    private final UserService userService;
    @PostMapping("/new")
    public ResponseEntity<Report> createReport(@RequestBody CreateReportRequest req, @RequestHeader("Authorization")String jwt){
        User user = userService.findUsernameByToken(jwt);
        Report report = reportService.createReport(req,user);
        return new ResponseEntity<>(report, HttpStatus.CREATED);
    }
}
