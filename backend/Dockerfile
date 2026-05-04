FROM eclipse-temurin:21-jdk

WORKDIR /food

COPY target/*.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]