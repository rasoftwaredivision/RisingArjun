# RisingArjun

## Development

Before you can build this project, you must install and configure the following dependencies on your machine:
A) Preconditions (Software to be installed):

1. JDK 12
2. Eclipse IDE
3. JHipster plugin in eclispe for JDL design
4. gpaphviz 2.38 version for display of ER diagrams of JDL. Higher versions of graphviz has compatability issues.
   graphviz-2.38.msi to be installed from
   https://www.softpedia.com/get/Others/Miscellaneous/Graphviz.shtml#download
   Set environment variable GRAPHVIZ_HOT to point to dot.exe eg C:\Program Files (x86)\Graphviz2.38\bin\dot.exe
   Also update PATH variable to point to Graphviz bin folder eg C:\Program Files (x86)\Graphviz2.38\bin\
5. maven for build
6. Git client for code checkin/pull from Github
7. install postgresql-12.4-1-windows-x64 with listening port 5432
8. Install dbvis_windows-x64_11_0_5_jre
9. Create database & DB user
   CREATE DATABASE risingarjun;
   CREATE USER risingarjun WITH PASSWORD 'risingarjun';
   GRANT ALL ON DATABASE risingarjun TO risingarjun;
10. [Node.js][]: We use Node to run a development web server and build the project.
    After installing Node, you should be able to run the following command to install development tools.
    You will only need to run this command when dependencies change in [package.json](package.json).
    npm install
    We use npm scripts and [Webpack][] as our build system.
    Run the following commands in two separate terminals to create a blissful development experience where your browser
    auto-refreshes when files change on your hard drive.
    ./mvnw
    npm start

Npm is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `npm update` and `npm install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `npm help update`.

The `npm run` command will list all of the scripts available to run for this project.

11. To update one or more entities use below steps
    STEP A:
    Refrences: https://www.jhipster.tech/development/ Database updates

11.1. Manually remove the import occurances for the entities to be updated from src/main/webapp/app/shared/reducers/index.ts. Don't remove any other line even if it's commented. eg /_ jhipster-needle-add-reducer-import - JHipster will add reducer here _/

11.2 Manually remove the MenuItem occurances for the entities to be updated from
src/main/webapp/app/shared/layout/menus/entities.tsx. Don't remove any other line even if it's commented. eg {/_ jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here _/}
STEP B:
Option1:
11.3 jhipster import-jdl jdl\risingarjun.jdl --json-only
This will import json of all entities inside .jhipster/
Now checkout all json files .jhipster/ that you don't want to modify.Keep only modified jsons of entities of interest.
11.4 Now regenerate all entities of interest one by one
jhipster entity Userdetail --regenerate -skip-db-changelog
jhipster entity Student --regenerate -skip-db-changelog
Option2:
11.3 jhipster entity Userdetail
now modify entity based on menu provided by jhipster for the entity
//https://www.jhipster.tech/creating-an-entity/ Updating an existing entity

STEP C:
11.5 Using "git diff" command see the files that shouldn't have been modified. Checkout all such files that shouldn't be modified.

11.6 checkout the changes done in master.xml file
git checkout src/main/resources/config/liquibase/master.xml

STEP D:
Option 1:
This option of recreating table to be used only when there is not data on table.
11.7 Delete the old files from changeelog directory and their corresponding entries from master.xml. Drop tables from database manually.
11.8 Add entries for newly created changelog files in master.xml.

Option 2:
11.7 mvnw compile liquibase:diff to create changelist created as src/main/resources/config/liquibase/changeelog/xxxx_changelog.xml
11.8 review changes in changelog.xml and if they are okay then add file entry in src/main/resources/config/liquibase/master.xml. so it is applied the next time you run your application.

Option 2:
11.7 Create an Sql command to manually make changes in DB using SQL command.

11.9 Remove all fake data from all CVS files inside src/main/resources/config/liquibase/data/

11.10 run mvnw to lunch application. This will made desired changes in DB

12. Application opens on 8080 port.
    Application is not able to fetch data is DB connection is already established by some other process.

B)Additional Steps
Refer below sites for creating dev environment

1. https://www.jhipster.tech/video-tutorial/
2. https://www.jhipster.tech/creating-an-app/
3. https://www.youtube.com/watch?v=LERTahPqVjo for eclipse JHispter plugin installation and usage.

4) https://github.com/mraible/jhipster6-demo/blob/master/demo.adoc

### Service workers

Service workers are commented by default, to enable them please uncomment the following code.

- The service worker registering script in index.html

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(function() {
      console.log('Service Worker Registered');
    });
  }
</script>
```

Note: workbox creates the respective service worker and dynamically generate the `service-worker.js`

### Managing dependencies

For example, to add [Leaflet][] library as a runtime dependency of your application, you would run following command:

    npm install --save --save-exact leaflet

To benefit from TypeScript type definitions from [DefinitelyTyped][] repository in development, you would run following command:

    npm install --save-dev --save-exact @types/leaflet

Then you would import the JS and CSS files specified in library's installation instructions so that [Webpack][] knows about them:
Note: there are still few other things remaining to do for Leaflet that we won't detail here.

For further instructions on how to develop with JHipster, have a look at [Using JHipster in development][].

## Building for production

### Packaging as jar

To build the final jar and optimize the risingarjun application for production, run:

    ./mvnw -Pprod clean verify

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

    java -jar target/*.jar

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

Refer to [Using JHipster in production][] for more details.

### Packaging as war

To package your application as a war in order to deploy it to an application server, run:

    ./mvnw -Pprod,war clean verify

## Testing

To launch your application's tests, run:

    ./mvnw verify

### Client tests

Unit tests are run by [Jest][] and written with [Jasmine][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

    npm test

For more information, refer to the [Running tests page][].

### Code quality

Sonar is used to analyse code quality. You can start a local Sonar server (accessible on http://localhost:9001) with:

```
docker-compose -f src/main/docker/sonar.yml up -d
```

You can run a Sonar analysis with using the [sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner) or by using the maven plugin.

Then, run a Sonar analysis:

```
./mvnw -Pprod clean verify sonar:sonar
```

If you need to re-run the Sonar phase, please be sure to specify at least the `initialize` phase since Sonar properties are loaded from the sonar-project.properties file.

```
./mvnw initialize sonar:sonar
```

or

For more information, refer to the [Code quality page][].

## Using Docker to simplify development (optional)

You can use Docker to improve your JHipster development experience. A number of docker-compose configuration are available in the [src/main/docker](src/main/docker) folder to launch required third party services.

For example, to start a postgresql database in a docker container, run:

    docker-compose -f src/main/docker/postgresql.yml up -d

To stop it and remove the container, run:

    docker-compose -f src/main/docker/postgresql.yml down

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

    ./mvnw -Pprod verify jib:dockerBuild

Then run:

    docker-compose -f src/main/docker/app.yml up -d

For more information refer to [Using Docker and Docker-Compose][], this page also contains information on the docker-compose sub-generator (`jhipster docker-compose`), which is able to generate docker configurations for one or several JHipster applications.

## Continuous Integration (optional)

To configure CI for your project, run the ci-cd sub-generator (`jhipster ci-cd`), this will let you generate configuration files for a number of Continuous Integration systems. Consult the [Setting up Continuous Integration][] page for more information.

[jhipster homepage and latest documentation]: https://www.jhipster.tech
[jhipster 6.1.2 archive]: https://www.jhipster.tech/documentation-archive/v6.1.2
[using jhipster in development]: https://www.jhipster.tech/documentation-archive/v6.1.2/development/
[using docker and docker-compose]: https://www.jhipster.tech/documentation-archive/v6.1.2/docker-compose
[using jhipster in production]: https://www.jhipster.tech/documentation-archive/v6.1.2/production/
[running tests page]: https://www.jhipster.tech/documentation-archive/v6.1.2/running-tests/
[code quality page]: https://www.jhipster.tech/documentation-archive/v6.1.2/code-quality/
[setting up continuous integration]: https://www.jhipster.tech/documentation-archive/v6.1.2/setting-up-ci/
[node.js]: https://nodejs.org/
[yarn]: https://yarnpkg.org/
[webpack]: https://webpack.github.io/
[angular cli]: https://cli.angular.io/
[browsersync]: http://www.browsersync.io/
[jest]: https://facebook.github.io/jest/
[jasmine]: http://jasmine.github.io/2.0/introduction.html
[protractor]: https://angular.github.io/protractor/
[leaflet]: http://leafletjs.com/
[definitelytyped]: http://definitelytyped.org/

## Deployment in Heroku

1. Install Heroku client from https://devcenter.heroku.com/articles/heroku-cli#download-and-install
2. Refer https://dashboard.heroku.com/apps/therisingarjun/deploy/heroku-git for using Heroku CLI. After installation run below commands to deploy app
   $ heroku login
$ jhipster heroku
   \$ heroku open

3. Redeploy app
   $ heroku login
$ git add .
   $ git commit -am "Release 0.002 Update"
 set git remote heroku to https://git.heroku.com/risingarjun.git
$heroku git:remote -a risingarjun
   $git remote -v
heroku  https://git.heroku.com/risingarjun.git (fetch)
heroku  https://git.heroku.com/risingarjun.git (push)
origin  https://github.com/rasoftwaredivision/RisingArjun.git (fetch)
origin  https://github.com/rasoftwaredivision/RisingArjun.git (push)
$git push heroku master

4. Steps to access database;
   Resources
   Heroku postgres
   Dataclips
   Give title and sql query and run
