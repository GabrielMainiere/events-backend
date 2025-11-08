package br.com.mscurrency;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MscurrencyApplication {

    public static void main(String[] args) {
        SpringApplication.run(MscurrencyApplication.class, args);
    }

}
