## Automated test task - Cypress-Cucumber-Invia
 

- [Technology overview](#technology-overview)
- [Running tests](#running-tests)
- [Results and reporting](#results-and-reporting)
- [Docker support](#docker-support)

## Technology overview
#### 1. Tools and approaches

`Cypress-Cucumber-Invia` automated testing solution for Invia test assigment uses (based on) the following tools and approaches:

- Modern multi-layered test automation framework structure
- PageObject pattern (custom implementation)
- Cypress - E2E testing solution - [http://cypress.io](http://cypress.io)
- Cypress-cucumber-preprocessor - Cypress plugin to support Cucumber BDD framework - [https://github.com/TheBrainFamily/cypress-cucumber-preprocessor](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor)
- WebDriver.io Visual regression service - [https://github.com/zinserjan/wdio-visual-regression-service](https://github.com/zinserjan/wdio-visual-regression-service)
- Multi Cucumber HTML Report - feature-rich HTML report creation - [https://github.com/wswebcreation/multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter)

#### 2. Cucumber and Cypress

Cucumber is the industry standard for designing BDD-based frameworks and allows the code of tests to be easily readable and
maintainable. Cucumber scenarios are also the best when it comes to understanding of how functionality works and tested.
 
Cucumber together with Cypress and Cypress-cucumber-preprocessor plugin make an extremely potent and flexible test automation solution which allows to achieve the following:
* Easy grouping of scenarios into sets, selective test execution (Cucumber tags and tag expressions)
* Execution of setUp/tearDown code only for the specific scenarios

### Installation

In order to manually install the required dependencies please make sure that you are in the root folder of **cucumber-cypress-invia** project
and execute the following command:

```sh
npm install
```

### Running tests

There are several main options available in order to run the tests:

- to run the automated test against `headed` **Chrome** browser locally: 
  ```sh
   npm test
  ```

- to run tests against `headless` **Electron** browser locally: 
  ```sh
   npm run test:headless
  ```
  
- to run tests against `headless` **Electron** browser in `Docker` container: 
  ```sh
   npm run test:headless-docker
  ```  

### Results and reporting
#### 1. Console output

During and after the test execution the following information will be displayed:

- Cypress testing session information - Cypress version, browser name with version, test name
- Cucumber test result information - feature names, number of scenarios with results of execution per scenario.

#### 2. Reports and videos 

 The following reports are generated upon the test run completion:
 1) **JSON** report (used by multi-HTML-reporter, Jenkins Cucumber plugin etc.) can be found in **cypress/reports** folder
 2) **HTML** report (Multiple-html-reporter) can also  be found in **cypress/reports** folder
 3) **Video** recording of the test execution can be found in **cypress/videos** folder (*only for Electron headless browser*)
  
  **NOTE** `Multiple HTML report` supports storing information about multiple testing sessions
 
### Docker support

 Cypress-Cucumber-Invia testing solution fully supports execution in a Docker container environment.
#### 1. Dockerfile and image
  
  Dockerfile for the tests can be found in the root folder of the project. Docker image is based on the image provided by Cypress
  with pre-installed stable version of `Google Chrome` and `NodeJs` all required dependencies.
  
  To build Cypress-Cucumber-Invia tests Docker image execute the following (in the project's root folder):
  ```sh
  docker build -t cypress-cucumber-tests .
  ``` 
  **NOTE** First time build usually takes a considerable amount of time because Docker will have to download base image and download and install
  all required packages (Cypress installation can be time-consuming in particular depending on the network/system performance). 
  Following builds will require much less time due to the reuse of existing layers and cache.
#### 2. Running tests in container

  Cypress-cucumber tests in Docker container are configured to be executed against the default `headless` **Electron** browser: 
  
  To run tests in the Docker container execute the following:
   ```sh
   docker run -it cypress-cucumber-tests
   ``` 
#### 3. Obtaining test reports and video recording

  Similar to test execution on a real computer it is possible to fetch all generated reports and video recording from the container.
  
  Use the following command to copy reports and video to the host (to parent folder of the current folder):
  
  ```sh
   docker cp $(docker ps -alq):/tests/cypress/reports ..
   docker cp $(docker ps -alq):/tests/cypress/videos ..
 ```
