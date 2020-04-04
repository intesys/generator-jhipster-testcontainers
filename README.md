# generator-jhipster-testcontainers

[![NPM version][npm-image]][npm-url] [![Build Status][github-actions-image]][github-actions-url] [![Dependency Status][daviddm-image]][daviddm-url]

> A Jhipster module to run integration tests with java [Testcontainers](https://www.testcontainers.org/)

# Introduction

This is a [JHipster](http://jhipster.github.io/) module to run Jhipster `@SpringBootTest` tests against on production database.
A database container will automatically boot during the test startup phase.

# Usage

```bash
npm install -g generator-jhipster-testcontainers
```

Run the module from your jhipster project folder:

```bash
yo jhipster-testcontainers
```

Run tests with the `testcontainers` spring profile

```bash
# maven
./mvnw verify -Dspring.profiles.active=testcontainers

# gradle
./gradlew integrationTest -Ptestcontainers
```

Example with mysql:

```java
🐳 [mysql:8.0.19]                        : Creating container for image: mysql:8.0.19
🐳 [mysql:8.0.19]                        : Starting container with ID: ce2bc59ebbd1e02d0cffa6f04fca43a10c516818a2d8be90720f833a639151b6
🐳 [mysql:8.0.19]                        : Container mysql:8.0.19 is starting: ce2bc59ebbd1e02d0cffa6f04fca43a10c516818a2d8be90720f833a639151b6
🐳 [mysql:8.0.19]                        : Waiting for database connection to become available at jdbc:mysql://localhost:32770/academydb using query 'SELECT 1'
🐳 [mysql:8.0.19]                        : Container is started (JDBC URL: jdbc:mysql://localhost:32770/testdb)
🐳 [mysql:8.0.19]                        : Container mysql:8.0.19 started in PT17.8709687S
com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
```

> IMPORTANT: H2 will still be the default option, use `testcontainers` profile to test using testcontainers.

# How it works

As for [testcontainers documentation](https://www.testcontainers.org/modules/databases/#database-containers-launched-via-jdbc-url-scheme):

> As long as you have Testcontainers and the appropriate JDBC driver on your classpath, you can simply modify regular
> JDBC connection URLs to get a fresh containerized instance of the database each time your application starts up.

This module simply adds a properties file in your test resources: `application-testcontainers.yml` and uses it when launching tests with `testcontainers` profile. 

This is how mysql properties look like.

```properties
spring.datasource.driver-class-name=org.testcontainers.jdbc.ContainerDatabaseDriver
spring.datasource.url=jdbc:tc:mysql:8.0.19://hostname/testdb
```

# Additional steps

### Mysql, Postgres, Mariadb

No additional steps required

### SQL Server

Due to licencing restrictions you are required to accept an EULA for this container image.
To indicate that you accept the MS SQL Server image EULA, place a file at the root of the classpath named
`container-license-acceptance.txt`, e.g. at `src/test/resources/container-license-acceptance.txt`.
This file should contain the line:

```
mcr.microsoft.com/mssql/server:latest
```

### Oracle

Modify the file `testcontainers.properties`, containing oracle.container.image=IMAGE, where IMAGE is a suitable image name and tag.

# License

Apache-2.0 © [Intesys Srl](https://www.intesys.it/)

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-testcontainers.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-testcontainers
[github-actions-image]: https://github.com/intesys/generator-jhipster-testcontainers/workflows/Build/badge.svg
[github-actions-url]: https://github.com/intesys/generator-jhipster-testcontainers/actions
[daviddm-image]: https://david-dm.org/intesys/generator-jhipster-testcontainers.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/intesys/generator-jhipster-testcontainers
