package com.project.controller;

import com.project.dto.response.VNPayResponse;
import com.project.service.impl.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class VNPayController {
    @Autowired
    private VNPayService vnPayService;

    @PostMapping("/submitOrder")
    public ResponseEntity<String> submitOrder(@RequestParam("amount") int orderTotal,
                                              @RequestParam("orderInfo") String orderInfo,
                                              HttpServletRequest request) {
        String baseUrl = "http://localhost:5173";
        String vnpayUrl = vnPayService.createOrder(orderTotal, orderInfo, baseUrl);
        return ResponseEntity.ok(vnpayUrl); // Trả về URL của VNPay
    }
    @GetMapping("/vnpay-payment")
    public ResponseEntity<?> getPaymentDetails(HttpServletRequest request) {
        int paymentStatus = vnPayService.orderReturn(request);

        String orderInfo = request.getParameter("vnp_OrderInfo");
        String paymentTime = request.getParameter("vnp_PayDate");
        String transactionId = request.getParameter("vnp_TransactionNo");
        String totalPrice = request.getParameter("vnp_Amount");

        VNPayResponse response = new VNPayResponse();
        response.setOrderId(orderInfo);
        response.setTotalPrice(totalPrice);
        response.setPaymentTime(paymentTime);
        response.setTransactionId(transactionId);
        response.setStatus(paymentStatus == 1 ? "success" : "fail");

        return ResponseEntity.ok(response);
    }
}
