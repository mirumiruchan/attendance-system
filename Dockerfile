FROM eclipse-temurin:17

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests

CMD ["java","-jar","target/attendance-system-0.0.1-SNAPSHOT.jar"]