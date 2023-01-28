# Aire-UX::Aire-Switch
This component implements a switch widget

## Development

### Prerequisites
Developing on Aire-Switch requires:

1. Gradle 7.5.x
2. Java 17
3. Maven 3.8.x

We recommend installing these via [SDKMAN](https://sdkman.io):

`sdk install maven 3.8.6`
`sdk install java 17.0.6-zulu`
`sdk install gradle 7.5.1`


### Running your development environment

1. Run `git clone git@github.com:aire-ux/aire-switch`
2. Run `gradle populatePaths populateVersions -Pdevelopment`
   - This will populate `build/generated/sources/main/io/sunshower/aire/ux/controls/Paths and Versions` 
     to point to local development dependencies
3. Run `gradle npmInstall` to install a project-local nodejs environment with NPM
4. Run `gradle buildResources` to build the web resources (styles, TypeScript components)
5. Run `gradle watch` to watch the web-resource source-files for changes
6. Run `gradle runDevelopment` to build the Java source-files


### Testing a production-ready build
When you're ready to test in production-mode:

1. run `npm link .`
2. run `npm install`
3. run `gradle clean populatePaths populateVersions -Pproduction`
4. run `gradle clean build bootRun -Pproduction`

