# order-production-service

Microservice to handle Order Productions, using Clean Architecture, TDD and BDD concepts and [SonarCloud Integration](#sonar).

---

![Static Badge](https://img.shields.io/badge/backend%20project-%230f42d9?style=for-the-badge)

![Static Badge](https://img.shields.io/badge/v20.9.0-version?logo=nodedotjs&logoColor=%23339933&color=%23339933&labelColor=white&label=Node%2EJS)
![Static Badge](https://img.shields.io/badge/v5.x-version?logo=typescript&logoColor=%233178c6&color=%233178c6&labelColor=white&label=TypeScript)
![Static Badge](https://img.shields.io/badge/v4.x-version?logo=express&logoColor=%23000000&color=%23000000&labelColor=white&label=Express)

---
![Static Badge](https://img.shields.io/badge/database-%230f42d9?style=for-the-badge)

![Static Badge](https://img.shields.io/badge/v5.x-version?logo=sqlite&logoColor=%234169E1&color=%234169E1&labelColor=white&label=SQLite)
![Static Badge](https://img.shields.io/badge/v6.x-version?logo=sequelize&logoColor=%2352B0E7&color=%2352B0E7&labelColor=white&label=Sequelize)

---
![Static Badge](https://img.shields.io/badge/cloud%20integrations-%230f42d9?style=for-the-badge)

![Static Badge](https://img.shields.io/badge/v3.x-version?logo=amazonaws&logoColor=%23FF9900&color=%23FF9900&labelColor=white&label=AWS%20SDK)

---
![Static Badge](https://img.shields.io/badge/utils-%230f42d9?style=for-the-badge)

![Static Badge](https://img.shields.io/badge/v4.x-version?logo=lodash&logoColor=%233492FF&color=%233492FF&labelColor=white&label=Lodash)
![Static Badge](https://img.shields.io/badge/v4.x-version?logo=dayjs&logoColor=%23FB6052&color=%23FB6052&labelColor=white&label=Dayjs)

---

<a name="table-of-contents"></a>

## Table of contents

* [General Info](#table-of-contents)
    * [ZAP](#zap)
    * [SAGA](#saga)
    * [RIPD](#ripd)
    * [Usage Video](#video)
    * [Customer Notification](#customer-notification)
* [Usage documentation](#table-of-contents)
    * [Envs](#envs)
    * [Usage with Docker](#table-of-contents)
        * [Prerequisites](#docker-prerequisites)
        * [Usage](#docker-usage)
    * [Usage with Node.JS](#table-of-contents)
        * [Prerequisites](#node-prerequisites)
        * [Installation](#node-installation)
        * [Usage](#node-usage)
        * [Tests](#tests)
    * [Endpoints Rules](#endpoints-rules)
    * [Postman Collection](#postman)
* [Architecture documentation](#table-of-contents)
    * [Database](#database)
    * [Integrations](#integrations)
        * [Sonar](#sonar)
    * [Folder Structure](#folder-structure)

---

<a name="zap"></a>

### OWASP ZAP Report

Our first report can be found [here](https://html-preview.github.io/?url=https://github.com/DenisSlapelis/order-production-service/blob/develop/docs/zap-reports/first-report.html), and the latest with the corrections is [here](https://html-preview.github.io/?url=https://github.com/DenisSlapelis/order-production-service/blob/develop/docs/zap-reports/last-report.html).

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="saga"></a>

### SAGA Pattern

We chose the choreography saga pattern because our business rule is not very complex and doesn't depend on a large number of microservices to be executed, we concluded that the choreography pattern would fit better for this situation. Another point is that since our group consists of only 3 people and we have exactly 3 microservices, it became easier to divide the work as well.

![saga](docs/assets/saga.svg "Saga")

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="ripd"></a>

### RIPD

You can find our RIPD (Relatório de Impacto dos Dados Pessoais) [here](https://docs.google.com/document/d/1Mw-uWwYO-TxTC0RA1C6AxOLVbDg2zWRdSmP78c5ysr8/edit?usp=sharing).

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="video"></a>

### Usage Video

You can find an explanatory video playlist about how the entire application works [here](https://www.youtube.com/watch?v=jbczUd8j2iI&list=PLYCTn1Be4VEZDL9zT4IxJKcw5vP9bnVRk).

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="customer-notification"></a>

### Customer Notification

We send SMS to customers as soon as the order starts to be prepared and also when the order is ready.

![sms_1](docs/assets/sms_1.jpeg "sms_1")
![sms_2](docs/assets/sms_2.jpeg "sms_2")

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="envs"></a>

### Envs

You must configure **.env** file following the [.env.example](/.env.example) template.
Some envs come directly from the [AWS Parameter Store](https://docs.aws.amazon.com/pt_br/systems-manager/latest/userguide/systems-manager-parameter-store.html), so it is very important to have configured the **AWS_ACCESS_KEY_ID** and **AWS_SECRET_ACCESS_KEY** values ​​so that all application envs are loaded correctly.

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="docker-prerequisites"></a>

## Docker Prerequisites

To run this project with docker, ensure that you have the following items:

* [Docker](https://www.docker.com/)
* [Configured .env file](#envs)

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="docker-usage"></a>

## Docker Usage

Start the node server with the following commands:

```shell
docker compose build
```

```shell
docker compose up -d
```

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="node-prerequisites"></a>

## Node Prerequisites

To run this project, ensure that you have the following items:

* [Node.JS](https://nodejs.org) (v20.9.0)
* [Configured .env file](#envs)

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="node-installation"></a>

## Node Installation

1. Clone this repository to your local machine or download the source code.
2. Open a terminal and navigate to the project's root directory.
3. Run the following command to install the project dependencies:

   ```shell
   npm install
   ```

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="node-usage"></a>

## Node Usage

Start the node server in developer mode with the following command:

```shell
npm run start:dev
```

This will start the server and watch for any file changes, automatically restarting the server when necessary.

Or start in production mode with the following command:

```shell
npm run start
```

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="tests"></a>

## Tests

* Run the following command to execute the project tests:

    ```shell
    npm run test
    ```

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="endpoints-rules"></a>

## Endpoints rules

* All endpoints can be found [here](https://documenter.getpostman.com/view/10486183/2s9YsQ7Ugr).
* Except healthcheck, all endpoints have the prefix `/api` followed by the route version, for example `/api/v1/`.
* All endpoints require authorization, which can be passed through the `Authorization` header with a valid **JWT token** (this can be obtained by making a **POST** request on the login route with username and password).
* The `Authorization` header is an `Bearer Token`.

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="postman"></a>

## Postman

* [Online Collection](https://documenter.getpostman.com/view/10486183/2s9YsQ7Ugr)

* [Download Collection](docs/rural-producer-service.postman_collection.json "Collection")

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="database"></a>

## Database

![database](docs/assets/order_production_db.schema.svg "Database")

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="integrations"></a>

## Integrations

![integrations](docs/assets/integrations.svg "Integrations")

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="sonar"></a>

## Sonar

![sonar](docs/assets/sonar.png "sonar")
![sonar_2](docs/assets/sonar_2.png "sonar_2")

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="folder-structure"></a>

## Folder Structure

* `.github`: github actions.
* `.vscode`: vscode configs.
* `docs`: all project documentations, like scripts, diagrams, texts.
* `src`
  * `config`: generic project configurations, like database configs, commit configs.
    * `database`: database configs.
      * `models`: database models.
      * `migrations`: database migrations.
    * `envs`: local and async envs configs.
  * `controllers`: application controllers.
  * `dtos`: application dtos.
  * `entities`: application domain entities.
  * `factories`: application factories to be used on routes.
  * `interfaces`: application interfaces.
  * `middlewares`: application middlewares.
  * `repositories`: application repositories.
  * `routes`: application routes.
    * `v1`: v1 endpoints.
  * `services`: application services.
  * `use-cases`: application use cases that contain the entire business rule.
  * `utils`: common utils functions, constants, and application dependencies.
    * `logger`: logger module.
* `tests`: project tests
    * `bdd`: bdd tests

([Back to Table of contents](#table-of-contents) :arrow_up:)
