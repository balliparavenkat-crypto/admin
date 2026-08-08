package com.dvglobal.service;

import com.dvglobal.entity.Conference;
import com.dvglobal.entity.Payment;
import com.dvglobal.entity.User;
import com.dvglobal.repository.ConferenceRepository;
import com.dvglobal.repository.PaymentRepository;
import com.dvglobal.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final ConferenceRepository conferenceRepository;
    private final UserRepository userRepository;

    public PaymentService(PaymentRepository paymentRepository, ConferenceRepository conferenceRepository,
                          UserRepository userRepository) {
        this.paymentRepository = paymentRepository;
        this.conferenceRepository = conferenceRepository;
        this.userRepository = userRepository;
    }

    public List<Payment> getPaymentsByUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + email));
        return paymentRepository.findByUserId(user.getId());
    }

    public List<Payment> getPaymentsByConference(Long conferenceId) {
        return paymentRepository.findByConferenceId(conferenceId);
    }

    public Payment processMockPayment(String email, Long conferenceId, String paymentGateway, Double amount, String currency) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + email));
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new IllegalArgumentException("Conference not found with ID: " + conferenceId));

        Payment payment = Payment.builder()
                .transactionId("TXN-" + UUID.randomUUID().toString().toUpperCase().substring(0, 12))
                .amount(amount)
                .currency(currency)
                .paymentGateway(paymentGateway.toUpperCase())
                .status("COMPLETED")
                .user(user)
                .conference(conference)
                .build();

        return paymentRepository.save(payment);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
}
