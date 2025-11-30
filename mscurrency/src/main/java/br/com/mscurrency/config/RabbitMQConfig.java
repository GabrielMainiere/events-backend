package br.com.mscurrency.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;

@Configuration
public class RabbitMQConfig {

    public static final String QUEUE = "currency.queue";
    public static final String EXCHANGE = "currency.exchange";
    public static final String ROUTING_KEY = "currency.routingKey";

    @Bean
    public DirectExchange currencyExchange() {
        return new DirectExchange(EXCHANGE);
    }

    @Bean
    public Queue currencyQueue() {
        return new Queue(QUEUE);
    }

    @Bean
    public Binding binding(Queue currencyQueue, DirectExchange currencyExchange) {
        return BindingBuilder.bind(currencyQueue).to(currencyExchange).with(ROUTING_KEY);
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(jackson2JsonMessageConverter());
        return template;
    }

    @Bean
    public MessageConverter jackson2JsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
