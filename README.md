# generator-jhipster-testcontainers
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A Jhipster module to run integration tests with java testcontainers

# Introduction

This is a [JHipster](http://jhipster.github.io/) module to run jhipster `@SpringTest` annotated tests against your production database.



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

With maven:

```bash
./mvnw test -Dspring.profiles.active=testcontainers
```

With gradle: 
```bash
./gradlew test -Ptestcontainers
```



# License

Apache-2.0 © [Intesys Srl](https://www.intesys.it/)


[npm-image]: https://img.shields.io/npm/v/generator-jhipster-testcontainers.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-testcontainers
[travis-image]: https://travis-ci.org/intesys/generator-jhipster-testcontainers.svg?branch=master
[travis-url]: https://travis-ci.org/intesys/generator-jhipster-testcontainers
[daviddm-image]: https://david-dm.org/intesys/generator-jhipster-testcontainers.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/intesys/generator-jhipster-testcontainers
