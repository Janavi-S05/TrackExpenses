FROM maven:3.9-eclipse-temurin-21-alpine AS build

WORKDIR /app

# Copy Maven wrapper & pom.xml first (better caching)
COPY mvnw ./
COPY .mvn .mvn
COPY pom.xml ./

# Give execute permission to mvnw
RUN chmod +x mvnw

# Download dependencies (cached layer)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy the jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Render injects PORT automatically
EXPOSE 8080

# JVM options (safe defaults for Render free tier)
ENV JAVA_OPTS="-Xms128m -Xmx512m"

# Start Spring Boot
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
