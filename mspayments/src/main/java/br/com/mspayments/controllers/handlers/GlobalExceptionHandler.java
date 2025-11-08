package br.com.mspayments.controllers.handlers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.graphql.data.method.annotation.GraphQlExceptionHandler;
import org.springframework.graphql.execution.DataFetcherExceptionResolverAdapter;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.stereotype.Component;
import graphql.GraphQLError;
import graphql.GraphqlErrorBuilder;
import graphql.schema.DataFetchingEnvironment;

@Component
@Slf4j
public class GlobalExceptionHandler extends DataFetcherExceptionResolverAdapter {

    @Override
    protected GraphQLError resolveToSingleError(Throwable ex, DataFetchingEnvironment env) {
        if (ex instanceof RuntimeException) {
            log.error("Erro capturado pelo handler global: {}", ex.getMessage(), ex);

            return GraphqlErrorBuilder.newError()
                .message(ex.getMessage() != null ? ex.getMessage() : "Erro interno do servidor")
                .errorType(ErrorType.BAD_REQUEST)
                .location(env.getField().getSourceLocation())
                .path(env.getExecutionStepInfo().getPath())
                .build();
        }

        return null; // Deixa outros handlers tratarem outros tipos de exceção
    }
}
