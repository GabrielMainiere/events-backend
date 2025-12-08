package br.com.mspayments.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class RabbitMQConfig {

    public static final String CURRENCY_QUEUE = "currency.queue";
    public static final String CURRENCY_EXCHANGE = "currency.exchange";
    public static final String CURRENCY_ROUTING_KEY = "currency.routingKey";

    public static final String REGISTRATION_QUEUE = "registration.queue";
    public static final String REGISTRATION_EXCHANGE = "registration.exchange";
    public static final String REGISTRATION_ROUTING_KEY = "registration.pattern";

    @Bean
    public Queue emailQueue() {
        return new Queue(CURRENCY_QUEUE, true); // durable
    }

    @Bean
    public DirectExchange emailExchange() {
        return new DirectExchange(CURRENCY_EXCHANGE);
    }

    @Bean
    public Binding emailBinding(Queue emailQueue, DirectExchange emailExchange) {
        return BindingBuilder.bind(emailQueue).to(emailExchange).with(CURRENCY_ROUTING_KEY);
    }

    @Bean
    public Queue registrationQueue() {
        return new Queue(REGISTRATION_QUEUE, true); // durable
    }

    @Bean
    public DirectExchange registrationExchange() {
        return new DirectExchange(REGISTRATION_EXCHANGE);
    }

    @Bean
    public Binding registrationBinding(Queue registrationQueue, DirectExchange registrationExchange) {
        return BindingBuilder.bind(registrationQueue).to(registrationExchange).with(REGISTRATION_ROUTING_KEY);
    }

    @Bean
    public Jackson2JsonMessageConverter jackson2JsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory(ConnectionFactory connectionFactory) {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setMessageConverter(jackson2JsonMessageConverter());
        factory.setDefaultRequeueRejected(false);
        return factory;
    }
}