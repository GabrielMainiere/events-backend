package br.com.mspayments.controllers;

import br.com.mspayments.models.Payment;
import br.com.mspayments.services.PaymentService;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.UUID;

@Controller
@AllArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @MutationMapping
    public PaymentResponse createPayment(@Argument("input") Payment input) {
        return  paymentService.create(input);
    }

    @QueryMapping
    public List<Payment> payments() {
        return paymentService.findAll();
    }

    @QueryMapping
    public Payment paymentById(@Argument String id) {
        return paymentService.findById(UUID.fromString(id));
    }

    @QueryMapping
    public List<Payment> paymentsByEvent(@Argument String eventId) {
        return paymentService.findAllByEventId(eventId);
    }
}