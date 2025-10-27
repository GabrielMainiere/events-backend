package br.com.mspayments.config;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    String dotenvPath = System.getenv("DOTENV_PATH");

    @Bean
    public Dotenv dotenv() {
        if (dotenvPath != null) {
            return Dotenv.configure()
                    .directory(dotenvPath)
                    .load();
        }
        return Dotenv.load();
    }

    @PostConstruct
    public void loadEnvVariables() {
        Dotenv dotenv = Dotenv.configure().load();
        dotenv.entries().forEach(entry -> {
            System.setProperty(entry.getKey(), entry.getValue());
        });
    }
}
