package com.dvglobal.controller;

import com.dvglobal.entity.Payment;
import com.dvglobal.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/charge")
    @PreAuthorize("authenticated")
    public ResponseEntity<Payment> charge(@RequestParam Long conferenceId,
                                          @RequestParam String paymentGateway,
                                          @RequestParam Double amount,
                                          @RequestParam String currency,
                                          Authentication authentication) {
        return ResponseEntity.ok(paymentService.processMockPayment(
                authentication.getName(), conferenceId, paymentGateway, amount, currency));
    }

    @GetMapping("/my-receipts")
    @PreAuthorize("authenticated")
    public ResponseEntity<List<Payment>> getMyReceipts(Authentication authentication) {
        return ResponseEntity.ok(paymentService.getPaymentsByUser(authentication.getName()));
    }

    @GetMapping("/conference/{conferenceId}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'CONFERENCE_CHAIR')")
    public ResponseEntity<List<Payment>> getConferencePayments(@PathVariable Long conferenceId) {
        return ResponseEntity.ok(paymentService.getPaymentsByConference(conferenceId));
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }
}
