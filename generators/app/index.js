/**
Copyright [2019] [Intesys Srl]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. 
*/
const chalk = require('chalk');
const packagejs = require('../../package.json');
const semver = require('semver');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

module.exports = class extends BaseGenerator {
    get initializing() {
        return {
            readConfig() {
                try {
                    this.jhipsterAppConfig = this.getAllJhipsterConfig();
                } catch (TypeError) {
                    //for jhipster 5.X
                    this.jhipsterAppConfig = this.getJhipsterAppConfig();
                }
                if (!this.jhipsterAppConfig) {
                    this.error('Can\'t read .yo-rc.json');
                }
            },
            displayLogo() {
                this.printJHipsterLogo();

                // Have Yeoman greet the user.
                this.log(`\nWelcome to the ${chalk.bold.yellow('JHipster testcontainers')} generator! ${chalk.yellow(`v${packagejs.version}\n`)}`);
            },
            checkJhipster() {
                const currentJhipsterVersion = this.jhipsterAppConfig.jhipsterVersion;
                const minimumJhipsterVersion = packagejs.dependencies['generator-jhipster'];
                if (!semver.satisfies(currentJhipsterVersion, '>=5.0.0 || >=6.0.0')) {
                    this.warning(`\nYour generated project used an old JHipster version (${currentJhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`);
                }
            }
        };
    }
    
    writing() {
        // function to use directly template
        this.template = function (source, destination) {
            this.fs.copyTpl(
                this.templatePath(source),
                this.destinationPath(destination),
                this
            );
        };

        const dbInfos = {
            "mysql": { artifactName: "mysql", containerName: jhipsterConstants.DOCKER_MYSQL},
            "postgresql": {artifactName: "postgresql", containerName: jhipsterConstants.DOCKER_POSTGRESQL},
            "mariadb": {artifactName: "mariadb", containerName: jhipsterConstants.DOCKER_MARIADB},
            "mssql": {artifactName: "mssqlserver", containerName: jhipsterConstants.DOCKER_MSSQL},
            "oracle": {artifactName: "oracle-xe", containerName: jhipsterConstants.DOCKER_ORACLE}
        }

        this.prodDatabaseType = this.jhipsterAppConfig.prodDatabaseType;
        this.enableHibernateCache = this.jhipsterAppConfig.enableHibernateCache;
        this.cacheProvider = this.jhipsterAppConfig.cacheProvider;
        if(!this.prodDatabaseType in dbInfos){
            //todo raise exception?
            this.log(`\nDatabase type ${this.prodDatabaseType} is not supported\n`);
            return;
        }

        this.testContainersVersion = "1.10.7";
        const dbInfo = dbInfos[this.prodDatabaseType];
        this.artifactName = dbInfo["artifactName"];
        this.buildTool = this.jhipsterAppConfig.buildTool;
        if (this.buildTool === 'maven') {
            this.addMavenProperty("testcontainers.version", this.testContainersVersion);
            this.addMavenDependencyInDirectory("", "org.testcontainers", `${this.artifactName}`, "${testcontainers.version}", "            <scope>test</scope>");
            
        } else if (this.buildTool === 'gradle') {
            this.applyFromGradleScript("gradle/testcontainers")
        }

        this.packageFolder = this.jhipsterAppConfig.packageFolder;
        const testDir = `${jhipsterConstants.SERVER_TEST_SRC_DIR + this.packageFolder}/`;
        
        this.packageName = this.jhipsterAppConfig.packageName;
        this.baseName = this.jhipsterAppConfig.baseName;
        this.containerName = `${dbInfo.containerName}`
        
        this.template(
            `${jhipsterConstants.SERVER_TEST_SRC_DIR}package/config/TestContainersConfiguration.java.ejs`,
            `${testDir}config/IntegrationTestsConfiguration.java`
        );

        this.template(
            `${jhipsterConstants.SERVER_TEST_SRC_DIR}package/config/TestContainersConfiguration.java.ejs`,
            `${testDir}config/IntegrationTestsConfiguration.java`
        );

        this.template(
            `${jhipsterConstants.SERVER_TEST_RES_DIR}/config/application-testcontainers.yml.ejs`,
            `${jhipsterConstants.SERVER_TEST_RES_DIR}/config/application-testcontainers.yml`
        );

        if (this.buildTool === 'gradle') {
            this.template(
                "gradle/testcontainers.gradle.ejs",
                "gradle/testcontainers.gradle",
            );
        }
        
    }

    end() {
        this.log('End of testcontainers generator');
    }
};
