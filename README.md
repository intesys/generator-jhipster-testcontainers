# generator-jhipster-testcontainers
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A Jhipster module to run integration tests with java [Testcontainers](https://www.testcontainers.org/)

# Introduction

This is a [JHipster](http://jhipster.github.io/) module to run Jhipster `@SpringBootTest` tests against your production database. A database container will automatically boot during the test startup phase. 

At the moment only SQL databases are supported.

This module will create a `@Configuration` which will override the default test datasource:
```java
@Configuration
@Profile("testcontainers")
public class IntegrationTestsConfiguration {

    @Bean
    public DataSource dataSource() {
        dbContainer = new MSSQLServerContainer("microsoft/mssql-server-linux:latest")
            .withPassword("yourStrong(!)Password");
        dbContainer.start();
        String jdbcUrl = dbContainer.getJdbcUrl();
        logger.info("Database started, creating datasource for url: '{}'", jdbcUrl);
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl(jdbcUrl);
        dataSource.setUsername(dbContainer.getUsername());
        dataSource.setPassword(dbContainer.getPassword());
        dataSource.setDriverClassName(dbContainer.getDriverClassName());
        dataSource.setAutoCommit(false);
        return dataSource;
    }

    @PreDestroy
    public void preDestroy(){
        if(this.dbContainer != null){
            this.dbContainer.stop();
        }
    }

}
```

H2 will still be the default option, use `testcontainers` profile to test using the production database.

# Testcontainer JDBC support
Testcontainers can be used also by simply modifying the `application.properties` test file and using driver `org.testcontainers.jdbc.ContainerDatabaseDriver`. See [testcontainers documentation](https://www.testcontainers.org/modules/databases/#database-containers-launched-via-jdbc-url-scheme) and [Jhipster with Testcontainers](https://atomfrede.gitlab.io/2019/05/jhipster-with-testcontainers/) for details.

# Prerequisites

As this is a [JHipster](http://jhipster.github.io/) module, we expect you have JHipster and its related tools already installed:

- [Installing JHipster](https://jhipster.github.io/installation.html)

# Installation

## With Yarn

To install this module:

```bash
yarn global add generator-jhipster-testcontainers
```

To update this module:

```bash
yarn global upgrade generator-jhipster-testcontainers
```

## With NPM

To install this module:

```bash
npm install -g generator-jhipster-testcontainers
```

To update this module:

```bash
npm update -g generator-jhipster-testcontainers
```

# Usage

Run the module from your jhipster project folder:

```bash
yo jhipster-testcontainers
```

Now you can run the tests with testcontainers.

With Jhipster 5:

```bash
# maven
./mvnw test -Dspring.profiles.active=testcontainers

# gradle
./gradlew test -Ptestcontainers
```

With Jhipster 6:

```bash
# maven
./mvnw verify -Dspring.profiles.active=testcontainers

# gradle
./gradlew integrationTest -Ptestcontainers
```


# License

Apache-2.0 © [Intesys Srl](https://www.intesys.it/)


[npm-image]: https://img.shields.io/npm/v/generator-jhipster-testcontainers.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-testcontainers
[travis-image]: https://travis-ci.org/intesys/generator-jhipster-testcontainers.svg?branch=master
[travis-url]: https://travis-ci.org/intesys/generator-jhipster-testcontainers
[daviddm-image]: https://david-dm.org/intesys/generator-jhipster-testcontainers.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/intesys/generator-jhipster-testcontainers
