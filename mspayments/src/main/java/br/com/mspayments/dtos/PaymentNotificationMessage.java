package br.com.mspayments.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentNotificationMessage {
    private String pattern;
    private PaymentNotificationData data;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PaymentNotificationData {
        private String eventId;
        private String userId;
        private String status;
    }
}

