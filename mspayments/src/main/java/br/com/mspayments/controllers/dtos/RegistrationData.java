package br.com.mspayments.controllers.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationData {
    private EventData event;
    private UserData user;

    public static RegistrationData fromGrpcResponse(br.com.mspayments.grpc.registration.GetRegistrationResponse response) {
        EventData eventData = new EventData(
            response.getTitle(),
            response.getDescription(),
            response.getStartAt(),
            response.getEndAt(),
            (int) (response.getPrice()),
            response.getSaleStartAt(),
            response.getSaleEndAt()
        );

        UserData userData = new UserData(
            response.getName(),
            response.getEmail(),
            response.getCpf()
        );

        return new RegistrationData(eventData, userData);
    }
}
