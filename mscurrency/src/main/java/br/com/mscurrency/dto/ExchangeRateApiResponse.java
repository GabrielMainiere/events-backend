package br.com.mscurrency.dto;

import lombok.Data;
import java.util.Map;

@Data
public class ExchangeRateApiResponse {
    private String result;
    private String documentation;
    private String terms_of_use;
    private Long time_last_update_unix;
    private String time_last_update_utc;
    private Long time_next_update_unix;
    private String time_next_update_utc;
    private String base_code;
    private Map<String, Float> conversion_rates;
}
