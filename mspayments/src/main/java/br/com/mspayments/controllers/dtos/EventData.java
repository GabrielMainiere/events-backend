package br.com.mspayments.controllers.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventData {
    private String title;
    private String description;
    private String startAt;
    private String endAt;
    private Integer price; // valor em centavos
    private String saleStartAt;
    private String saleEndAt;
}
