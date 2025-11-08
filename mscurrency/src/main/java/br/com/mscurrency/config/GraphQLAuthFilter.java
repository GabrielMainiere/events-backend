package br.com.mscurrency.config;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.*;

@Component
@Slf4j
public class GraphQLAuthFilter implements Filter {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Só processar requisições GraphQL
        if (!httpRequest.getRequestURI().equals("/graphql")) {
            chain.doFilter(request, response);
            return;
        }

        // Só validar se for POST
        if (!"POST".equalsIgnoreCase(httpRequest.getMethod())) {
            chain.doFilter(request, response);
            return;
        }

        // Lê o corpo da requisição para identificar a mutation
        String body = getBody(httpRequest);
        JsonNode json = objectMapper.readTree(body);

        // Recupera roles do header
        String roleNamesHeader = httpRequest.getHeader("x-request-rolenames");
        List<String> roles = roleNamesHeader == null ? List.of() :
                Arrays.stream(roleNamesHeader.split(","))
                        .map(String::trim)
                        .filter(s -> !s.isEmpty())
                        .toList();

        boolean hasAdminRole = roles.contains("ADMIN");

        if (!hasAdminRole) {
            sendGraphQLError(httpResponse, "Acesso negado. Role ADMIN é necessária.");
            return;
        }

        log.info("Access authorized with roles: {}", roleNamesHeader);
        chain.doFilter(new CachedBodyHttpServletRequest(httpRequest, body), response);
    }

    private void sendGraphQLError(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");

        Map<String, Object> errorResponse = new HashMap<>();
        Map<String, Object> error = new HashMap<>();
        error.put("message", message);
        error.put("errorType", "BAD_REQUEST");

        errorResponse.put("errors", List.of(error));

        String jsonResponse = objectMapper.writeValueAsString(errorResponse);
        response.getWriter().write(jsonResponse);
    }

    private String getBody(HttpServletRequest request) throws IOException {
        StringBuilder sb = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        return sb.toString();
    }
}
