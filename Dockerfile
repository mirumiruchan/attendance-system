FROM eclipse-temurin:17

WORKDIR /app

COPY target/attendance-system-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

CMD ["java","-jar","app.jar"]