# =====================================================
# BUILD STAGE
# =====================================================

FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

# Copy Maven configuration first
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build application
RUN mvn clean package -DskipTests


# =====================================================
# RUNTIME STAGE
# =====================================================

FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy generated Spring Boot jar
COPY --from=build /app/target/*.jar app.jar

# Spring Boot port
EXPOSE 8080

# Start application
ENTRYPOINT ["java", "-jar", "app.jar"]