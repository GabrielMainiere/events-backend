package br.com.mscurrency.services.impl;

import br.com.mscurrency.dto.ExchangeRateApiResponse;
import br.com.mscurrency.services.ExchangeRateApiService;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class ExchangeRateApiServiceImpl implements ExchangeRateApiService {

    private final RestTemplate restTemplate;
    private final String apiUrl;

    public ExchangeRateApiServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        Dotenv dotenv = Dotenv.configure()
                .filename(".env")
                .ignoreIfMissing()
                .load();
        this.apiUrl = dotenv.get("EXCHANGE_RATES_API_URL", "");
    }

    @Override
    public Map<String, Float> getExchangeRates() {
        if (apiUrl == null || apiUrl.isEmpty()) {
            log.error("Exchange Rate API URL not configured. Please set EXCHANGE_RATES_API_URL in .env file");
            return new HashMap<>();
        }

        try {
            log.info("Fetching exchange rates from API: {}", apiUrl);

            ExchangeRateApiResponse response = restTemplate.getForObject(
                apiUrl + "/BRL",
                ExchangeRateApiResponse.class
            );

            if (response != null && "success".equals(response.getResult())) {
                log.info("Successfully fetched exchange rates. Base: {}", response.getBase_code());
                return response.getConversion_rates();
            }

            log.error("Failed to fetch exchange rates. Response: {}", response);
            return new HashMap<>();

        } catch (Exception e) {
            log.error("Error fetching exchange rates from API", e);
            return new HashMap<>();
        }
    }
}
