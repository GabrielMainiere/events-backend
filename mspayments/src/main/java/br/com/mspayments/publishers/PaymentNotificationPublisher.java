package br.com.mspayments.publishers;

public interface PaymentNotificationPublisher {
    void publishPaymentNotification(String eventId, String userId, String status);
}

