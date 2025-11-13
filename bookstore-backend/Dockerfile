FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy the built JAR into the image
COPY target/bookstore-backend-1.0.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
