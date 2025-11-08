FROM maven:3.9.6-eclipse-temurin-21 as builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src/ ./src/
RUN mvn clean package -DskipTests=true

FROM eclipse-temurin:21 as prod
RUN mkdir /app
COPY --from=builder /app/target/*.jar /app/app.jar
COPY .env ./app/.env
ENV SERVER_PORT=8081
WORKDIR /app
EXPOSE 8081
CMD ls
ENTRYPOINT ["java","-jar","app.jar"]