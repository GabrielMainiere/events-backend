package br.com.mscurrency.config;

import graphql.schema.GraphQLScalarType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Configuration
public class GraphQLConfig {

    @Bean
    public RuntimeWiringConfigurer runtimeWiringConfigurer() {
        return wiringBuilder -> wiringBuilder
                .scalar(GraphQLScalarType.newScalar()
                        .name("Long")
                        .description("Long scalar")
                        .coercing(new graphql.schema.Coercing<Long, Long>() {
                            @Override
                            public Long serialize(Object dataFetcherResult) {
                                if (dataFetcherResult instanceof Long) {
                                    return (Long) dataFetcherResult;
                                }
                                if (dataFetcherResult instanceof Number) {
                                    return ((Number) dataFetcherResult).longValue();
                                }
                                return null;
                            }

                            @Override
                            public Long parseValue(Object input) {
                                if (input instanceof Long) {
                                    return (Long) input;
                                }
                                if (input instanceof Number) {
                                    return ((Number) input).longValue();
                                }
                                return null;
                            }

                            @Override
                            public Long parseLiteral(Object input) {
                                if (input instanceof graphql.language.IntValue) {
                                    return ((graphql.language.IntValue) input).getValue().longValue();
                                }
                                return null;
                            }
                        })
                        .build())
                .scalar(GraphQLScalarType.newScalar()
                        .name("LocalDateTime")
                        .description("LocalDateTime scalar")
                        .coercing(new graphql.schema.Coercing<LocalDateTime, String>() {
                            @Override
                            public String serialize(Object dataFetcherResult) {
                                if (dataFetcherResult instanceof LocalDateTime) {
                                    return ((LocalDateTime) dataFetcherResult).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
                                }
                                return null;
                            }

                            @Override
                            public LocalDateTime parseValue(Object input) {
                                if (input instanceof String) {
                                    return LocalDateTime.parse((String) input, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
                                }
                                return null;
                            }

                            @Override
                            public LocalDateTime parseLiteral(Object input) {
                                if (input instanceof graphql.language.StringValue) {
                                    return LocalDateTime.parse(((graphql.language.StringValue) input).getValue(), DateTimeFormatter.ISO_LOCAL_DATE_TIME);
                                }
                                return null;
                            }
                        })
                        .build());
    }
}
